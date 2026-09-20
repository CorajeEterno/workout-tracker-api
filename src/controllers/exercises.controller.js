const pool = require('../config/db'); // Ajusta la ruta según tu conexión

// 1. Listar todos los ejercicios
const getExercises = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exercises');
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Obtener un ejercicio por ID
const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM exercises WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado' });
    }
    
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Crear un nuevo ejercicio
const createExercise = async (req, res) => {
  try {
    const { name, description, category, muscleGroup } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO exercises (name, description, category, muscleGroup) VALUES (?, ?, ?, ?)',
      [name, description, category, muscleGroup]
    );

    res.status(201).json({
      success: true,
      message: 'Ejercicio creado exitosamente',
      data: { id: result.insertId, name, description, category, muscleGroup }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Actualizar un ejercicio
const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, muscleGroup } = req.body;

    const [result] = await pool.query(
      'UPDATE exercises SET name = ?, description = ?, category = ?, muscleGroup = ? WHERE id = ?',
      [name, description, category, muscleGroup, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado para actualizar' });
    }

    res.status(200).json({ success: true, message: 'Ejercicio actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Eliminar un ejercicio
const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM exercises WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado para eliminar' });
    }

    res.status(200).json({ success: true, message: 'Ejercicio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
};