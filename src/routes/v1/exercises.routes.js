const { Router } = require('express');
const exercisecontrollers = require('../../controllers/exercises.controller');

const router = Router();


router.get('/', exercisecontrollers.getExercises);
router.get('/:id', exercisecontrollers.getExerciseById);
router.post('/', exercisecontrollers.createExercise);
router.put('/:id', exercisecontrollers.updateExercise);
router.patch('/:id', exercisecontrollers. updateExercisePatch);
router.delete('/:id', exercisecontrollers.deleteExercise);

module.exports = router;