const { Router } = require('express');

// Importaciones relativas desde la misma carpeta (src/routes/v1)
const usersRoutes = require('./users.routes');
const workoutsRoutes = require('./workouts.routes'); 
const exercisesRoutes = require('./exercises.routes'); 
const progressRoutes = require('./progress.routes'); 

const router = Router();

// Rutas de los recursos
router.use('/users', usersRoutes);
router.use('/workouts', workoutsRoutes); 
router.use('/exercises', exercisesRoutes);
router.use('/progress', progressRoutes); 

// Endpoint de metadatos o estado de la v1 (GET /api/v1/)
router.get('/', (req, res) => {
    res.json({
        message: 'Workout Tracker API',
        version: 'v1',
        endpoints: {
            users: '/api/v1/users',
            workouts: '/api/v1/workouts',
            exercises: '/api/v1/exercises',
            progress: '/api/v1/progress'
        }
    });
});

module.exports = router;