const { Router } = require('express');
const { generateProgressReport, getProgressReportsByUser } = require('../../controllers/progress.controller');

const router = Router();

// POST /api/v1/progress -> Crea el reporte de progreso (en el body se envía el userId)
router.post('/', generateProgressReport);

// GET /api/v1/progress/users/:userId -> Obtiene la lista de reportes para un usuario
router.get('/users/:userId', getProgressReportsByUser);

module.exports = router;