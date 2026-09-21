const { Router } = require('express');
const {
  generateProgressReport,
  getAllProgressReports,
  getProgressReportsByUser,
  updateProgressReport,
  deleteProgressReport
} = require('../../controllers/progress.controller');

const router = Router();

// GET /api/v1/progress -> Obtiene todos los reportes de progreso
router.get('/', getAllProgressReports);

// POST /api/v1/progress -> Genera un nuevo reporte de progreso (espera userId en el body)
router.post('/', generateProgressReport);

// GET /api/v1/progress/users/:userId -> Obtiene los reportes de un usuario específico
router.get('/users/:userId', getProgressReportsByUser);

// PUT /api/v1/progress/:id -> Actualiza un reporte específico por su ID
router.put('/:id', updateProgressReport);

// DELETE /api/v1/progress/:id -> Elimina un reporte específico por su ID
router.delete('/:id', deleteProgressReport);

module.exports = router;