const db = {
  users: [
    { id: 1, name: 'Usuario Demo', email: 'demo@mail.com' }
  ],
  exercises: [
    { id: 1, name: 'Press de Banca', description: 'Ejercicio de pecho con barra', category: 'Fuerza', muscleGroup: 'Pecho' }
  ],
  workouts: [
    {
      id: 1,
      userId: 1,
      title: 'Rutina de Pecho y Tríceps',
      description: 'Enfoque en hipertrofia',
      scheduledAt: '2026-09-20T10:00:00.000Z',
      durationMinutes: 60,
      status: 'completed',
      exercises: [
        {
          exerciseId: 1,
          name: 'Press de Banca',
          sets: 4,
          reps: 10,
          weight: 70
        }
      ]
    }
  ],
  progress: [
    {
      id: 1,
      userId: 1,
      totalWorkouts: 1,
      history: [
        {
          workoutId: 1,
          title: 'Rutina de Pecho y Tríceps',
          scheduledAt: '2026-09-20T10:00:00.000Z',
          status: 'completed',
          exercises: [
            {
              exerciseId: 1,
              name: 'Press de Banca',
              sets: 4,
              reps: 10,
              weight: 70
            }
          ]
        }
      ],
      updatedAt: '2026-09-21T12:00:00.000Z'
    }
  ]
};

module.exports = db;