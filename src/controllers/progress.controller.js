const db = require('../config/db');

const generateProgressReport = (req, res) => {
  const userId = Number(req.body.userId);
  if (!userId) return res.status(400).json({ success: false, message: 'El userId es obligatorio' });

  const userWorkouts = db.workouts.filter(w => w.userId === userId);
  const newReport = {
    id: db.progressReports.length ? db.progressReports[db.progressReports.length - 1].id + 1 : 1,
    userId,
    totalWorkouts: userWorkouts.length,
    history: userWorkouts.map(({ id, title, scheduledAt, status }) => ({ id, title, scheduledAt, status })),
    generatedAt: new Date().toISOString()
  };

  db.progressReports.push(newReport);
  res.status(201).json({ success: true, data: newReport });
};

const getAllProgressReports = (req, res) => {
  res.status(200).json({ success: true, data: db.progressReports });
};

const getProgressReportsByUser = (req, res) => {
  const userReports = db.progressReports.filter(r => r.userId === Number(req.params.userId));
  res.status(200).json({ success: true, data: userReports });
};

const updateProgressReport = (req, res) => {
  const index = db.progressReports.findIndex(r => r.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Informe de progreso no encontrado' });

  db.progressReports[index] = { ...db.progressReports[index], ...req.body };
  res.status(200).json({ success: true, message: 'Informe de progreso actualizado exitosamente' });
};

const deleteProgressReport = (req, res) => {
  const index = db.progressReports.findIndex(r => r.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Informe de progreso no encontrado' });

  db.progressReports.splice(index, 1);
  res.status(200).json({ success: true, message: 'Informe de progreso eliminado exitosamente' });
};

module.exports = {
  generateProgressReport,
  getAllProgressReports,
  getProgressReportsByUser,
  updateProgressReport,
  deleteProgressReport
};