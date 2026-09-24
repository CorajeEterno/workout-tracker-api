const db = require('../config/db');

// Helper para validar el formato básico del email
const isValidEmail = (email) => typeof email === 'string' && email.includes('@');

// GET /api/v1/users
const getUsers = (req, res) => {
  try {
    const userAgent = req.headers['user-agent'];
    console.log(`Cliente realizando la petición: ${userAgent}`);

    let results = db.users;
    const { limit } = req.query;

    if (limit) results = results.slice(0, Number(limit));
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/users/:id
const getUserById = (req, res) => {
  try {
    const user = db.users.find(u => u.id === Number(req.params.id));
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/users
const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    // Validación de campos requeridos
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Nombre y email son obligatorios' });
    }

    // Validación de formato de email (debe incluir '@')
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'El correo electrónico no es válido, debe contener un "@"' });
    }

    const newUser = {
      id: db.users.length ? db.users[db.users.length - 1].id + 1 : 1,
      name,
      email
    };

    db.users.push(newUser);
    res.status(201).json({ success: true, message: 'Usuario creado exitosamente', data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/users/:id (Actualización completa)
const updateUserPut = (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Para PUT se requieren todos los campos (name, email)' });
    }

    // Validación de formato de email (debe incluir '@')
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'El correo electrónico no es válido, debe contener un "@"' });
    }

    const index = db.users.findIndex(u => u.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    db.users[index] = { id: Number(req.params.id), name, email };
    res.status(200).json({ success: true, message: 'Usuario reemplazado completamente', data: db.users[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/users/:id (Actualización parcial)
const updateUserPatch = (req, res) => {
  try {
    const { email } = req.body;

    // Si envían un email en el body del PATCH, validamos que tenga '@'
    if (email !== undefined && !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'El correo electrónico no es válido, debe contener un "@"' });
    }

    const index = db.users.findIndex(u => u.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    db.users[index] = { ...db.users[index], ...req.body };
    res.status(200).json({ success: true, message: 'Usuario actualizado parcialmente', data: db.users[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/users/:id
const deleteUser = (req, res) => {
  try {
    const index = db.users.findIndex(u => u.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    db.users.splice(index, 1);
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserPut,
  updateUserPatch,
  deleteUser
};