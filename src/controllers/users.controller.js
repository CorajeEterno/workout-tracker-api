const db = require('../config/db');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: db.users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = db.users.find(u => u.id === Number(id));

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Crear usuario
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
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

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const index = db.users.findIndex(u => u.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    db.users[index] = { ...db.users[index], name, email };
    res.status(200).json({ success: true, message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const index = db.users.findIndex(u => u.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    db.users.splice(index, 1);
    res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};