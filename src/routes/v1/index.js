const { Router } = require('express');
const usersRoutes = require('./users.routes');
const workoutsRoutes = require('./workouts.routes'); 
const exercisesRoutes = require('./exercises.routes'); 
const progressRoutes = require('./progress.routes'); // 1. Importar las rutas de progress

const router = Router();

// Rutas de usuarios -> Resultado final: /api/v1/users
router.use('/users', usersRoutes);

// Rutas de entrenamientos -> Resultado final: /api/v1/workouts
router.use('/workouts', workoutsRoutes); 

// Rutas de ejercicios -> Resultado final: /api/v1/exercises
router.use('/exercises', exercisesRoutes);

// Rutas de progreso -> Resultado final: /api/v1/progress
router.use('/progress', progressRoutes); // 2. Registrar las rutas de progress

module.exports = router;