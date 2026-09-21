const { Router } = require('express');
const userController = require('../../controllers/users.controller');

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUserPut);
router.patch('/:id', userController.updateUserPatch);
router.delete('/:id', userController.deleteUser);

module.exports = router;