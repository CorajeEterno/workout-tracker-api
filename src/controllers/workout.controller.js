const pool = require('../config/db');

// [POST] /v1/workouts - Crear un nuevo plan de entrenamiento
const createWorkout = async (req, res) => {
    try {
        const { userId, title, description, scheduledAt, durationMinutes, status } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO workouts (userId, title, description, scheduledAt, durationMinutes, status) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, title, description, scheduledAt, durationMinutes, status || 'pending']
        );

        res.status(201).json({ 
            success: true, 
            message: 'Entrenamiento creado correctamente',
            data: { id: result.insertId, userId, title, description, scheduledAt, durationMinutes, status: status || 'pending' }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// [GET] /v1/workouts - Listar entrenamientos (soporta filtros ?status=pending y ?date=YYYY-MM-DD)
const getWorkouts = async (req, res) => {
    try {
        const { status, date } = req.query;
        let query = 'SELECT * FROM workouts WHERE 1=1';
        let params = [];

        if (status) {
            query += ' AND status = ?';
            params.push(status);
        }

        if (date) {
            query += ' AND DATE(scheduledAt) = ?';
            params.push(date);
        }

        query += ' ORDER BY scheduledAt ASC';

        const [workouts] = await pool.query(query, params);
        res.status(200).json({ success: true, data: workouts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// [GET] /v1/workouts/:id - Obtener detalle de un entrenamiento
const getWorkoutById = async (req, res) => {
    try {
        const { id } = req.params;
        const [workouts] = await pool.query('SELECT * FROM workouts WHERE id = ?', [id]);

        if (workouts.length === 0) {
            return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
        }

        res.status(200).json({ success: true, data: workouts[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// [PUT] /v1/workouts/:id - Actualizar un entrenamiento existente
const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, scheduledAt, durationMinutes, status } = req.body;

        const [existing] = await pool.query('SELECT * FROM workouts WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
        }

        await pool.query(
            'UPDATE workouts SET title = ?, description = ?, scheduledAt = ?, durationMinutes = ?, status = ? WHERE id = ?',
            [title, description, scheduledAt, durationMinutes, status, id]
        );

        res.status(200).json({ success: true, message: 'Entrenamiento actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// [DELETE] /v1/workouts/:id - Eliminar un entrenamiento específico
const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM workouts WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Entrenamiento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout
};