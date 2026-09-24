const db = require('../config/db');

// GET /api/v1/exercises (con filtros query opcionales)
const getExercises = async (req, res) => {
  try {
    let results = db.exercises;
    const { category, muscleGroup, limit } = req.query; // Uso de req.query (Punto 3)

    // Filtros de búsqueda opcionales
    if (category) {
      results = results.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }
    if (muscleGroup) {
      results = results.filter(e => e.muscleGroup.toLowerCase() === muscleGroup.toLowerCase());
    }
    if (limit) {
      results = results.slice(0, Number(limit));
    }

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/exercises/:id
const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params; // Uso de req.params
    const exercise = db.exercises.find(e => e.id === Number(id));

    if (!exercise) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado' });
    }

    res.status(200).json({ success: true, data: exercise });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/exercises
const createExercise = async (req, res) => {
  try {
    const { name, description, category, muscleGroup } = req.body; // Uso de req.body

    // Validación de campo obligatorio
    if (!name) {
      return res.status(400).json({ success: false, message: 'El nombre del ejercicio es obligatorio' });
    }

    const newExercise = {
      id: db.exercises.length ? db.exercises[db.exercises.length - 1].id + 1 : 1,
      name,
      description: description || '',
      category: category || 'General',
      muscleGroup: muscleGroup || 'General'
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

// PUT /api/v1/exercises/:id (Reemplazo completo)
const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, muscleGroup } = req.body;

    // Validación de todos los campos obligatorios para PUT
    if (!name || !description || !category || !muscleGroup) {
      return res.status(400).json({ 
        success: false, 
        message: 'Para PUT se requieren todos los campos (name, description, category, muscleGroup)' 
      });
    }

    const index = db.exercises.findIndex(e => e.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado para actualizar' });
    }

    db.exercises[index] = { id: Number(id), name, description, category, muscleGroup };

    res.status(200).json({ 
      success: true, 
      message: 'Ejercicio reemplazado completamente', 
      data: db.exercises[index] 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/exercises/:id (Actualización parcial)
const updateExercisePatch = async (req, res) => {
  try {
    const { id } = req.params;
    const index = db.exercises.findIndex(e => e.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado para actualizar' });
    }

    // Fusionar campos existentes con las modificaciones
    db.exercises[index] = { ...db.exercises[index], ...req.body };

    res.status(200).json({
      success: true,
      message: 'Ejercicio actualizado parcialmente exitosamente',
      data: db.exercises[index]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/exercises/:id
const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const index = db.exercises.findIndex(e => e.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado para eliminar' });
    }

    db.exercises.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,      
  updateExercisePatch, 
  deleteExercise
};