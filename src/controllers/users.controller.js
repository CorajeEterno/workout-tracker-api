const pool = require('../config/db');

// [GET] Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// [GET] Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// [POST] Crear un usuario nuevo
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );

        res.status(201).json({
            success: true,
            message: 'Usuario guardado exitosamente',
            data: { id: result.insertId, name, email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// [PUT] Actualizar un usuario existente
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        
        const [result] = await pool.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// [DELETE] Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

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