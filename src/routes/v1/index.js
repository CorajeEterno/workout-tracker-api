const { Router } = require('express');
const usersRoutes = require('./users.routes');

const router = Router();

// Todas las rutas de usuarios irán bajo el prefijo /users
// Resultado final: /api/v1/users
router.use('/users', usersRoutes);

module.exports = router;