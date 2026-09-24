const db = require('../config/db');

// Función auxiliar
const validateExercises = (exercisesArray) => {
  if (!Array.isArray(exercisesArray)) return { valid: true, data: [] };

  const validatedList = [];
  for (const item of exercisesArray) {
    const exerciseId = Number(item.exerciseId);
    const catalogExercise = db.exercises.find(e => e.id === exerciseId);

    if (!catalogExercise) {
      return {
        valid: false,
        message: `El ejercicio con ID ${item.exerciseId} no existe en el catálogo de ejercicios`
      };
    }

    validatedList.push({
      exerciseId: catalogExercise.id,
      name: catalogExercise.name,
      sets: Number(item.sets || 0),
      reps: Number(item.reps || 0),
      weight: Number(item.weight || 0)
    });
  }

  return { valid: true, data: validatedList };
};

// GET /api/v1/workouts
const getWorkouts = async (req, res) => {
  try {
    let results = db.workouts;
    const { limit, userId, status, exerciseId } = req.query;

    if (userId) {
      results = results.filter(w => w.userId === Number(userId));
    }
    if (status) {
      results = results.filter(w => w.status.toLowerCase() === status.toLowerCase());
    }
    if (exerciseId) {
      results = results.filter(w =>
        w.exercises && w.exercises.some(e => e.exerciseId === Number(exerciseId))
      );
    }
    if (limit) {
      results = results.slice(0, Number(limit));
    }

    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/workouts/:id
const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = db.workouts.find(w => w.id === Number(id));

    if (!workout) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
    }

    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/workouts
const createWorkout = async (req, res) => {
  try {
    const { userId, title, description, scheduledAt, durationMinutes, status, exercises } = req.body;

    if (!userId || !title) {
      return res.status(400).json({
        success: false,
        message: 'Los campos userId y title son obligatorios'
      });
    }

    const exerciseValidation = validateExercises(exercises);
    if (!exerciseValidation.valid) {
      return res.status(404).json({ success: false, message: exerciseValidation.message });
    }

    const newWorkout = {
      id: db.workouts.length ? db.workouts[db.workouts.length - 1].id + 1 : 1,
      userId: Number(userId),
      title,
      description: description || '',
      scheduledAt: scheduledAt || new Date().toISOString(),
      durationMinutes: Number(durationMinutes || 0),
      status: status || 'pending',
      exercises: exerciseValidation.data
    };

    db.workouts.push(newWorkout);

    res.status(201).json({
      success: true,
      message: 'Entrenamiento creado exitosamente',
      data: newWorkout
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/workouts/:id/exercises
const addExerciseToWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { exerciseId, sets, reps, weight } = req.body;

    if (!exerciseId) {
      return res.status(400).json({ success: false, message: 'El campo exerciseId es obligatorio' });
    }

    const workout = db.workouts.find(w => w.id === Number(id));
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
    }

    const catalogExercise = db.exercises.find(e => e.id === Number(exerciseId));
    if (!catalogExercise) {
      return res.status(404).json({
        success: false,
        message: `El ejercicio con ID ${exerciseId} no existe en el catálogo`
      });
    }

    if (!workout.exercises) {
      workout.exercises = [];
    }

    const newExerciseRelation = {
      exerciseId: catalogExercise.id,
      name: catalogExercise.name,
      sets: Number(sets || 0),
      reps: Number(reps || 0),
      weight: Number(weight || 0)
    };

    workout.exercises.push(newExerciseRelation);

    res.status(201).json({
      success: true,
      message: 'Ejercicio vinculado exitosamente al entrenamiento',
      data: workout
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/workouts/:id
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, description, scheduledAt, durationMinutes, status, exercises } = req.body;

    if (userId === undefined || !title || description === undefined || !scheduledAt || durationMinutes === undefined || !status) {
      return res.status(400).json({
        success: false,
        message: 'Para PUT se requieren todos los campos (userId, title, description, scheduledAt, durationMinutes, status)'
      });
    }

    const index = db.workouts.findIndex(w => w.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado para actualizar' });
    }

    const exerciseValidation = validateExercises(exercises);
    if (!exerciseValidation.valid) {
      return res.status(404).json({ success: false, message: exerciseValidation.message });
    }

    db.workouts[index] = {
      id: Number(id),
      userId: Number(userId),
      title,
      description,
      scheduledAt,
      durationMinutes: Number(durationMinutes),
      status,
      exercises: exerciseValidation.data,
      updatedAt: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      message: 'Entrenamiento reemplazado completamente',
      data: db.workouts[index]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/workouts/:id
const updateWorkoutPatch = async (req, res) => {
  try {
    const { id } = req.params;
    const index = db.workouts.findIndex(w => w.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado para actualizar' });
    }

    let updatedExercises = db.workouts[index].exercises || [];

    if (req.body.exercises) {
      const exerciseValidation = validateExercises(req.body.exercises);
      if (!exerciseValidation.valid) {
        return res.status(404).json({ success: false, message: exerciseValidation.message });
      }
      updatedExercises = exerciseValidation.data;
    }

    db.workouts[index] = {
      ...db.workouts[index],
      ...req.body,
      exercises: updatedExercises,
      id: Number(id),
      updatedAt: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      message: 'Entrenamiento actualizado parcialmente exitosamente',
      data: db.workouts[index]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/workouts/:id
const deleteWorkout = (req, res) => {
  try {
    const { id } = req.params;
    const index = db.workouts.findIndex(w => w.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
    }

    db.workouts.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/workouts/:id/exercises/:exerciseId
const updateExerciseInWorkout = async (req, res) => {
  try {
    const { id, exerciseId } = req.params;
    const { sets, reps, weight } = req.body;

    if (sets === undefined || reps === undefined || weight === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Para PUT se requieren todos los campos (sets, reps, weight)'
      });
    }

    const workout = db.workouts.find(w => w.id === Number(id));
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
    }

    const exerciseIndex = workout.exercises?.findIndex(e => e.exerciseId === Number(exerciseId));
    if (exerciseIndex === undefined || exerciseIndex === -1) {
      return res.status(404).json({ success: false, message: 'El ejercicio no está asignado a este entrenamiento' });
    }

    workout.exercises[exerciseIndex] = {
      ...workout.exercises[exerciseIndex],
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight)
    };

    res.status(200).json({
      success: true,
      message: 'Ejercicio del entrenamiento actualizado completamente',
      data: workout
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/workouts/:id/exercises/:exerciseId
const patchExerciseInWorkout = async (req, res) => {
  try {
    const { id, exerciseId } = req.params;
    const { sets, reps, weight } = req.body;

    const workout = db.workouts.find(w => w.id === Number(id));
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
    }

    const exercise = workout.exercises?.find(e => e.exerciseId === Number(exerciseId));
    if (!exercise) {
      return res.status(404).json({ success: false, message: 'El ejercicio no está asignado a este entrenamiento' });
    }

    if (sets !== undefined) exercise.sets = Number(sets);
    if (reps !== undefined) exercise.reps = Number(reps);
    if (weight !== undefined) exercise.weight = Number(weight);

    res.status(200).json({
      success: true,
      message: 'Ejercicio del entrenamiento actualizado parcialmente',
      data: workout
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/workouts/:id/exercises/:exerciseId
const deleteExerciseFromWorkout = async (req, res) => {
  try {
    const { id, exerciseId } = req.params;

    const workout = db.workouts.find(w => w.id === Number(id));
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
    }

    const exerciseIndex = workout.exercises?.findIndex(e => e.exerciseId === Number(exerciseId));
    if (exerciseIndex === undefined || exerciseIndex === -1) {
      return res.status(404).json({ success: false, message: 'El ejercicio no existe en este entrenamiento' });
    }

    workout.exercises.splice(exerciseIndex, 1);

    res.status(200).json({
      success: true,
      message: 'Ejercicio eliminado del entrenamiento exitosamente',
      data: workout
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  addExerciseToWorkout,
  updateWorkout,
  updateWorkoutPatch,
  deleteWorkout,
  updateExerciseInWorkout,
  patchExerciseInWorkout,
  deleteExerciseFromWorkout
};