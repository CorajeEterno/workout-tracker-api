const db = require('../config/db');

// POST /api/v1/progress - Crear un nuevo registro de progreso con ejercicios incluidos
const createProgress = (req, res) => {
  try {
    const userId = Number(req.body.userId);
    if (!userId) {
      return res.status(400).json({ success: false, message: 'El userId es obligatorio' });
    }

    const userWorkouts = db.workouts ? db.workouts.filter(w => w.userId === userId) : [];

    const newProgress = {
      id: db.progress.length ? db.progress[db.progress.length - 1].id + 1 : 1,
      userId,
      totalWorkouts: userWorkouts.length,
      history: userWorkouts.map(({ id, title, scheduledAt, status, exercises }) => ({
        workoutId: id,
        title,
        scheduledAt,
        status,
        exercises: exercises
          ? exercises.map(e => ({
              exerciseId: e.exerciseId,
              name: e.name,
              sets: e.sets,
              reps: e.reps,
              weight: e.weight
            }))
          : []
      })),
      createdAt: new Date().toISOString()
    };

    db.progress.push(newProgress);
    res.status(201).json({ success: true, data: newProgress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/progress - Listar todo el progreso (con soporte a ?userId=1)
const getAllProgress = (req, res) => {
  try {
    let result = [...db.progress];
    const { userId } = req.query;

    if (userId) {
      result = result.filter(p => p.userId === Number(userId));
    }

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/progress/:id - Obtener un registro por ID
const getProgressById = (req, res) => {
  try {
    const item = db.progress.find(p => p.id === Number(req.params.id));
    if (!item) {
      return res.status(404).json({ success: false, message: 'Progreso no encontrado' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/progress/:id - Reemplazo total (ID inmutable protegido)
const updateProgress = (req, res) => {
  try {
    const { id } = req.params;
    const { userId, totalWorkouts, history } = req.body;

    if (userId === undefined || totalWorkouts === undefined || !history) {
      return res.status(400).json({
        success: false,
        message: 'Para PUT se requieren todos los campos (userId, totalWorkouts, history)'
      });
    }

    const index = db.progress.findIndex(p => p.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Progreso no encontrado' });
    }

    db.progress[index] = {
      id: Number(id),
      userId: Number(userId),
      totalWorkouts: Number(totalWorkouts),
      history,
      updatedAt: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      data: db.progress[index]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/progress/:id - Actualización parcial (ID inmutable protegido)
const updateProgressPatch = (req, res) => {
  try {
    const { id } = req.params;
    const index = db.progress.findIndex(p => p.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Progreso no encontrado' });
    }

    db.progress[index] = {
      ...db.progress[index],
      ...req.body,
      id: Number(id),
      updatedAt: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      data: db.progress[index]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/progress/:id - Eliminación (204 No Content)
const deleteProgress = (req, res) => {
  try {
    const index = db.progress.findIndex(p => p.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Progreso no encontrado' });
    }

    db.progress.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProgress,
  getAllProgress,
  getProgressById,
  updateProgress,
  updateProgressPatch,
  deleteProgress
};