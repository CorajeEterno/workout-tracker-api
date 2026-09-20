const { Router } = require('express');
const { 
    getUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../../controllers/users.controller');

const router = Router();

// Rutas generales y de creación
router.get('/', getUsers);
router.post('/', createUser);

// Rutas que requieren ID específico
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;