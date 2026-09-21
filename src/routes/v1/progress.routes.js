const { Router } = require('express');
const {
  generateProgressReport,
  getAllProgressReports,
  getProgressReportsByUser,
  updateProgressReport,
  deleteProgressReport
} = require('../../controllers/progress.controller');

const router = Router();

// GET /api/v1/progress -> Obtiene TODOS los reportes de progreso de todos los usuarios
router.get('/', getAllProgressReports);

// POST /api/v1/progress -> Genera un nuevo reporte
router.post('/', generateProgressReport);

// GET /api/v1/progress/users/:userId -> Obtiene reportes de un usuario específico
router.get('/users/:userId', getProgressReportsByUser);

// PUT /api/v1/progress/:id -> Actualiza un reporte específico por ID
router.put('/:id', updateProgressReport);

// DELETE /api/v1/progress/:id -> Elimina un reporte específico por ID
router.delete('/:id', deleteProgressReport);

module.exports = router;