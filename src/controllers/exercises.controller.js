const db = require('../config/db');

// 1. Obtener todos los ejercicios
const getExercises = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: db.exercises });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Obtener un ejercicio por ID
const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = db.exercises.find(e => e.id === Number(id));

    if (!exercise) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado' });
    }

    res.status(200).json({ success: true, data: exercise });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Crear un nuevo ejercicio
const createExercise = async (req, res) => {
  try {
    const { name, description, category, muscleGroup } = req.body;

    const newExercise = {
      id: db.exercises.length ? db.exercises[db.exercises.length - 1].id + 1 : 1,
      name,
      description,
      category,
      muscleGroup
    };

    db.exercises.push(newExercise);

    res.status(201).json({
      success: true,
      message: 'Ejercicio creado exitosamente',
      data: newExercise
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

    const index = db.exercises.findIndex(e => e.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado para actualizar' });
    }

    db.exercises[index] = { ...db.exercises[index], name, description, category, muscleGroup };

    res.status(200).json({ success: true, message: 'Ejercicio actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Eliminar un ejercicio
const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const index = db.exercises.findIndex(e => e.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado para eliminar' });
    }

    db.exercises.splice(index, 1);
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