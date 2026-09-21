const db = {
  users: [
    { id: 1, name: 'Usuario Demo', email: 'demo@mail.com' },
    { id: 2, name: 'Carlos Pérez', email: 'carlos@mail.com' }
  ],
  exercises: [
    { id: 1, name: 'Press de Banca', description: 'Ejercicio de pecho con barra', category: 'Fuerza', muscleGroup: 'Pecho' },
    { id: 2, name: 'Sentadilla Libre', description: 'Sentadilla profunda con barra', category: 'Fuerza', muscleGroup: 'Piernas' }
  ],
  workouts: [
    {
      id: 1,
      userId: 1,
      title: 'Rutina de Pecho y Tríceps',
      description: 'Enfoque en hipertrofia',
      scheduledAt: '2026-09-20T10:00:00.000Z',
      durationMinutes: 60,
      status: 'completed'
    },
    {
      id: 2,
      userId: 1,
      title: 'Entrenamiento de Pierna Pesado',
      description: 'Fuerza e intensidad alta',
      scheduledAt: '2026-09-22T08:00:00.000Z',
      durationMinutes: 45,
      status: 'pending'
    }
  ]
};

module.exports = db;