const { Router } = require('express');
const {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
} = require('../../controllers/exercises.controller');

const router = Router();

// Rutas CRUD para el catálogo de ejercicios (/api/v1/exercises)
router.get('/', getExercises);
router.get('/:id', getExerciseById);
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

module.exports = router;