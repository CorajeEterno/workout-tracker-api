const pool = require('../config/db');

// POST: Genera y guarda un nuevo informe de progreso
const generateProgressReport = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'El userId es obligatorio' });
    }

    // 1. Validar que el usuario existe
    const [users] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // 2. Obtener el total de entrenamientos
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as totalWorkouts FROM workouts WHERE userId = ?',
      [userId]
    );
    const totalWorkouts = countResult[0].totalWorkouts;

    // 3. Obtener el historial de entrenamientos pasados
    const [historyRows] = await pool.query(
      'SELECT id, title, scheduledAt, status FROM workouts WHERE userId = ? ORDER BY scheduledAt DESC',
      [userId]
    );

    // 4. Insertar el reporte en la base de datos
    const generatedAt = new Date();
    const historyJson = JSON.stringify(historyRows); // Necesario para la columna JSON en la BD

    const [insertResult] = await pool.query(
      'INSERT INTO progress_reports (userId, totalWorkouts, history, generatedAt) VALUES (?, ?, ?, ?)',
      [userId, totalWorkouts, historyJson, generatedAt]
    );

    // 5. Responder al cliente
    res.status(201).json({
      success: true,
      data: {
        id: insertResult.insertId,
        userId: Number(userId),
        totalWorkouts,
        history: historyRows, // Se devuelve como Array/Objeto, no como string
        generatedAt
      }
    });

  } catch (error) {
    console.error('Error al generar el progreso:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// GET: Obtiene todos los informes de un usuario específico
const getProgressReportsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const [reports] = await pool.query(
      'SELECT id, userId, totalWorkouts, history, generatedAt FROM progress_reports WHERE userId = ? ORDER BY generatedAt DESC',
      [userId]
    );

    // Dependiendo del driver (mysql2), la columna JSON a veces ya viene parseada.
    // Si viene como string, la parseamos para que la API siempre devuelva un JSON válido.
    const formattedReports = reports.map(report => ({
      ...report,
      history: typeof report.history === 'string' ? JSON.parse(report.history) : report.history
    }));

    res.status(200).json({
      success: true,
      data: formattedReports
    });

  } catch (error) {
    console.error('Error al obtener los informes:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

module.exports = {
  generateProgressReport,
  getProgressReportsByUser
};