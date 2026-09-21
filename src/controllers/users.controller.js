const db = require('../config/db');

// GET /users?limit=10
const getUsers = (req, res) => {
  let results = db.users;
  const { limit } = req.query;

  if (limit) results = results.slice(0, Number(limit));
  res.status(200).json({ success: true, data: results });
};

// GET /users/:id
const getUserById = (req, res) => {
  const user = db.users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

  res.status(200).json({ success: true, data: user });
};

// POST /users
const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Nombre y email son obligatorios' });
  }

  const newUser = {
    id: db.users.length ? db.users[db.users.length - 1].id + 1 : 1,
    name,
    email
  };

  db.users.push(newUser);
  res.status(201).json({ success: true, message: 'Usuario creado', data: newUser });
};

// PUT /users/:id (Actualización COMPLETA)
const updateUserPut = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Para PUT se requieren todos los campos (name, email)' });
  }

  const index = db.users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

  db.users[index] = { id: Number(req.params.id), name, email };
  res.status(200).json({ success: true, message: 'Usuario reemplazado completamente', data: db.users[index] });
};

// PATCH /users/:id (Actualización PARCIAL)
const updateUserPatch = (req, res) => {
  const index = db.users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

  db.users[index] = { ...db.users[index], ...req.body };
  res.status(200).json({ success: true, message: 'Usuario actualizado parcialmente', data: db.users[index] });
};

// DELETE /users/:id (Estado 204 No Content)
const deleteUser = (req, res) => {
  const index = db.users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

  db.users.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserPut,
  updateUserPatch,
  deleteUser
};