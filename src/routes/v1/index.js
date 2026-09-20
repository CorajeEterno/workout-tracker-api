const { Router } = require('express');
const usersRoutes = require('./users.routes');
const workoutsRoutes = require('./workouts.routes'); // Nombre en plural
const exercisesRoutes = require('./exercises.routes'); // Nuevo módulo de ejercicios en plural

const router = Router();

// Rutas de usuarios -> Resultado final: /api/v1/users
router.use('/users', usersRoutes);

// Rutas de entrenamientos -> Resultado final: /api/v1/workouts
router.use('/workouts', workoutsRoutes); 

// Rutas de ejercicios -> Resultado final: /api/v1/exercises
router.use('/exercises', exercisesRoutes);

module.exports = router;