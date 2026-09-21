const { Router } = require('express');
const workoutController = require('../../controllers/workout.controller');

const router = Router();

// Rutas CRUD para entrenamientos (/api/v1/workouts)
router.post('/', workoutController.createWorkout);
router.get('/', workoutController.getWorkouts);
router.get('/:id', workoutController.getWorkoutById);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;