const express = require('express');
const router = express.Router();

// Importar versiones de rutas
const v1Routes = require('./v1');

// Configurar rutas versionadas
router.use('/v1', v1Routes);

// Ruta base para información de la API
router.get('/', (req, res) => {
    res.json({
        message: 'Workout Tracker API',
        versions: ['v1'],
        endpoints: {
            v1: '/api/v1'
        }
    });
});

module.exports = router;