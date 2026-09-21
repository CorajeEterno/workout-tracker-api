const pool = require('../config/db');

// POST: Genera y guarda un nuevo informe de progreso
const generateProgressReport = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'El userId es obligatorio' });
    }

    const [users] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const [countResult] = await pool.query(
      'SELECT COUNT(*) as totalWorkouts FROM workouts WHERE userId = ?',
      [userId]
    );
    const totalWorkouts = countResult[0].totalWorkouts;

    const [historyRows] = await pool.query(
      'SELECT id, title, scheduledAt, status FROM workouts WHERE userId = ? ORDER BY scheduledAt DESC',
      [userId]
    );

    const generatedAt = new Date();
    const historyJson = JSON.stringify(historyRows);

    const [insertResult] = await pool.query(
      'INSERT INTO progress_reports (userId, totalWorkouts, history, generatedAt) VALUES (?, ?, ?, ?)',
      [userId, totalWorkouts, historyJson, generatedAt]
    );

    res.status(201).json({
      success: true,
      data: {
        id: insertResult.insertId,
        userId: Number(userId),
        totalWorkouts,
        history: historyRows,
        generatedAt
      }
    });

  } catch (error) {
    console.error('Error al generar el progreso:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

const getAllProgressReports = async (req, res) => {
  try {
    const [reports] = await pool.query(
      'SELECT id, userId, totalWorkouts, history, generatedAt FROM progress_reports ORDER BY generatedAt DESC'
    );

    const formattedReports = reports.map(report => ({
      ...report,
      history: typeof report.history === 'string' ? JSON.parse(report.history) : report.history
    }));

    res.status(200).json({
      success: true,
      data: formattedReports
    });

  } catch (error) {
    console.error('Error al obtener todos los informes:', error);
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

// PUT: Modifica un informe de progreso existente por su ID
const updateProgressReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { totalWorkouts, history } = req.body;

    // Convertir el historial a JSON si viene en el cuerpo de la petición
    const historyJson = history ? JSON.stringify(history) : null;

    const [result] = await pool.query(
      'UPDATE progress_reports SET totalWorkouts = COALESCE(?, totalWorkouts), history = COALESCE(?, history) WHERE id = ?',
      [totalWorkouts, historyJson, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Informe de progreso no encontrado' });
    }

    res.status(200).json({
      success: true,
      message: 'Informe de progreso actualizado exitosamente'
    });

  } catch (error) {
    console.error('Error al actualizar el informe:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// DELETE: Elimina un informe de progreso por su ID
const deleteProgressReport = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM progress_reports WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Informe de progreso no encontrado' });
    }

    res.status(200).json({
      success: true,
      message: 'Informe de progreso eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar el informe:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

module.exports = {
  generateProgressReport,
  getAllProgressReports, 
  getProgressReportsByUser,
  updateProgressReport,
  deleteProgressReport
};