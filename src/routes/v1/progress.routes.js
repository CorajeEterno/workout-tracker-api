const { Router } = require('express');
const progresscontrollers = require('../../controllers/progress.controller');

const router = Router();

router.get('/', progresscontrollers.getAllProgress);
router.post('/', progresscontrollers.createProgress);
router.get('/:id', progresscontrollers.getProgressById);
router.put('/:id', progresscontrollers.updateProgress);
router.patch('/:id', progresscontrollers.updateProgressPatch);
router.delete('/:id', progresscontrollers.deleteProgress);

module.exports = router;