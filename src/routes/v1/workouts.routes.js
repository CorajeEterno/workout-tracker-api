const { Router } = require('express');
const workoutController = require('../../controllers/workout.controller');

const router = Router();

// Rutas CRUD estándar para entrenamientos (/api/v1/workouts)
router.post('/', workoutController.createWorkout);
router.get('/', workoutController.getWorkouts);
router.get('/:id', workoutController.getWorkoutById);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

// Rutas anidadas para gestionar los ejercicios dentro de un entrenamiento específico
router.post('/:workoutId/exercises', workoutController.addExerciseToWorkout);
router.get('/:workoutId/exercises', workoutController.getExercisesByWorkout);
router.put('/:workoutId/exercises/:id', workoutController.updateWorkoutExercise);
router.delete('/:workoutId/exercises/:id', workoutController.removeExerciseFromWorkout);

module.exports = router;