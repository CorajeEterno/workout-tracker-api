const { Router } = require('express');
const usersRoutes = require('./users.routes');
const workoutRoutes = require('./workouts.routes');

const router = Router();

// Todas las rutas de usuarios irán bajo el prefijo /users
// Resultado final: /api/v1/users
router.use('/users', usersRoutes);

// Todas las rutas de entrenamientos irán bajo el prefijo /workouts
// Resultado final: /api/v1/workouts
router.use('/workouts', workoutRoutes); 

module.exports = router;