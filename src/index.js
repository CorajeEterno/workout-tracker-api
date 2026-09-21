const express = require('express');
// Instancia un enrutador modular independiente para agrupar y versionar las rutas de la API
const router = express.Router();

// Importar versiones de rutas
// Requiere el archivo o carpeta './v1', que contiene las rutas específicas de la versión 1 (users, workouts, etc.)
const v1Routes = require('./v1');

// Configurar rutas versionadas
// Middleware de enrutamiento: cualquier petición hacia '/v1' es redirigida al enrutador 'v1Routes'
router.use('/v1', v1Routes);

// Ruta base para información de la API
// Endpoint GET de información base/estado que responde al consultar la raíz del prefijo
router.get('/', (req, res) => {
    // Retorna la metadatos estructurados con la versión activa y la ruta de acceso
    res.json({
        message: 'Workout Tracker API',
        versions: ['v1'],
        endpoints: {
            v1: '/api/v1'
        }
    });
});

// Exporta este enrutador principal para ser conectado en app.js bajo el prefijo '/api'
module.exports = router;