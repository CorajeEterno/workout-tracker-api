const pool = require('../config/db'); // Ajusta esta ruta si es necesario según la ubicación de tu controlador

// ==========================================
// CONTROLADORES DE WORKOUTS
// ==========================================

const createWorkout = async (req, res) => {
  try {
    const { userId, title, description, scheduledAt, durationMinutes, status } = req.body;
    const [result] = await pool.query(
      'INSERT INTO workouts (userId, title, description, scheduledAt, durationMinutes, status) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, title, description, scheduledAt, durationMinutes, status]
    );
    res.status(201).json({
      success: true,
      message: 'Entrenamiento creado exitosamente',
      data: { id: result.insertId, userId, title, description, scheduledAt, durationMinutes, status }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM workouts');
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM workouts WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, scheduledAt, durationMinutes, status } = req.body;
    const [result] = await pool.query(
      'UPDATE workouts SET title = ?, description = ?, scheduledAt = ?, durationMinutes = ?, status = ? WHERE id = ?',
      [title, description, scheduledAt, durationMinutes, status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Entrenamiento actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM workouts WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Entrenamiento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ==========================================
// CONTROLADORES DE WORKOUTS <-> EXERCISES
// ==========================================

// Asociar un ejercicio al entrenamiento de un usuario
const addExerciseToWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { exerciseId, sets, reps, weight } = req.body;

    const [workoutCheck] = await pool.query('SELECT * FROM workouts WHERE id = ?', [workoutId]);
    if (workoutCheck.length === 0) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
    }

    const [exerciseCheck] = await pool.query('SELECT * FROM exercises WHERE id = ?', [exerciseId]);
    if (exerciseCheck.length === 0) {
      return res.status(404).json({ success: false, message: 'Ejercicio no encontrado en el catálogo' });
    }

    const [result] = await pool.query(
      'INSERT INTO workout_exercises (workoutId, exerciseId, sets, reps, weight) VALUES (?, ?, ?, ?, ?)',
      [workoutId, exerciseId, sets, reps, weight]
    );

    res.status(201).json({
      success: true,
      message: 'Ejercicio asociado al entrenamiento exitosamente',
      data: {
        id: result.insertId,
        workoutId: Number(workoutId),
        exerciseId,
        sets,
        reps,
        weight
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener los ejercicios asociados a un entrenamiento específico
const getExercisesByWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;

    const [rows] = await pool.query(
      `SELECT we.id as associationId, e.id as exerciseId, e.name, e.category, e.muscleGroup, we.sets, we.reps, we.weight 
       FROM workout_exercises we
       JOIN exercises e ON we.exerciseId = e.id
       WHERE we.workoutId = ?`,
      [workoutId]
    );

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar las series, repeticiones o peso de un ejercicio dentro de un entrenamiento
const updateWorkoutExercise = async (req, res) => {
  try {
    const { workoutId, id } = req.params;
    const { sets, reps, weight } = req.body;

    const [result] = await pool.query(
      'UPDATE workout_exercises SET sets = ?, reps = ?, weight = ? WHERE id = ? AND workoutId = ?',
      [sets, reps, weight, id, workoutId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Relación de ejercicio en el entrenamiento no encontrada' });
    }

    res.status(200).json({ success: true, message: 'Ejercicio del entrenamiento actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remover un ejercicio de un entrenamiento
const removeExerciseFromWorkout = async (req, res) => {
  try {
    const { workoutId, id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM workout_exercises WHERE id = ? AND workoutId = ?',
      [id, workoutId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Relación de ejercicio en el entrenamiento no encontrada' });
    }

    res.status(200).json({ success: true, message: 'Ejercicio removido del entrenamiento exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  addExerciseToWorkout,
  getExercisesByWorkout,
  updateWorkoutExercise,
  removeExerciseFromWorkout
};