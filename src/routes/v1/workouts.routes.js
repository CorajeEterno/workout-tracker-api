const { Router } = require('express');
const workoutcontroller = require('../../controllers/workout.controller');

const router = Router();


router.post('/', workoutcontroller.createWorkout);
router.get('/', workoutcontroller.getWorkouts);
router.get('/:id', workoutcontroller.getWorkoutById);
router.put('/:id', workoutcontroller.updateWorkout);
router.patch('/:id', workoutcontroller.updateWorkoutPatch)
router.delete('/:id', workoutcontroller.deleteWorkout)
router.post('/:id/exercises', workoutcontroller.addExerciseToWorkout);
router.put('/:id/exercises/:exerciseId', workoutcontroller.updateExerciseInWorkout);
router.patch('/:id/exercises/:exerciseId', workoutcontroller.patchExerciseInWorkout);
router.delete('/:id/exercises/:exerciseId', workoutcontroller.deleteExerciseFromWorkout);

module.exports = router;