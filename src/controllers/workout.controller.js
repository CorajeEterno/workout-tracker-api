const db = require('../config/db');

const createWorkout = (req, res) => {
  const { userId, title, description, scheduledAt, durationMinutes, status } = req.body;
  const newWorkout = {
    id: db.workouts.length ? db.workouts[db.workouts.length - 1].id + 1 : 1,
    userId: Number(userId),
    title,
    description,
    scheduledAt,
    durationMinutes: Number(durationMinutes),
    status: status || 'pending'
  };

  db.workouts.push(newWorkout);
  res.status(201).json({ success: true, message: 'Entrenamiento creado exitosamente', data: newWorkout });
};

const getWorkouts = (req, res) => {
  const { status, date, scheduledAt } = req.query;
  let results = db.workouts;

  if (status) results = results.filter(w => w.status === status);
  const targetDate = date || scheduledAt;
  if (targetDate) results = results.filter(w => w.scheduledAt?.startsWith(targetDate));

  res.status(200).json({ success: true, data: results });
};

const getWorkoutById = (req, res) => {
  const workout = db.workouts.find(w => w.id === Number(req.params.id));
  if (!workout) return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });

  res.status(200).json({ success: true, data: workout });
};

const updateWorkout = (req, res) => {
  const index = db.workouts.findIndex(w => w.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });

  db.workouts[index] = { ...db.workouts[index], ...req.body };
  res.status(200).json({ success: true, message: 'Entrenamiento actualizado exitosamente' });
};

const deleteWorkout = (req, res) => {
  const index = db.workouts.findIndex(w => w.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Entrenamiento no encontrado' });

  db.workouts.splice(index, 1);
  res.status(200).json({ success: true, message: 'Entrenamiento eliminado exitosamente' });
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout
};