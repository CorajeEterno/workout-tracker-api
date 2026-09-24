# Workout Tracker API
API RESTful desarrollada en Node.js y Express para la gestión integral de usuarios, rutinas de entrenamiento, catálogo de ejercicios, asociación de ejercicios a entrenamientos y registro histórico de progreso.

## 🛠️ Tecnologías Utilizadas
Node.js: Entorno de ejecución para JavaScript en el servidor.

Express.js: Framework web minimalista para la creación de la API RESTful.

Nodemon: Herramienta de desarrollo para recarga automática del servidor ante cambios de código.

Dotenv: Gestión de variables de entorno mediante archivos .env.

Postman: Plataforma para pruebas y validación de endpoints HTTP.

**POSTMAN**

# Tabla de Endpoints y ejemplo de peticion y respuesta

## users

- 1.POST http://localhost:8000/api/v1/users (Creamos usuario)
```json
peticion(/users)

{
    "name": "Emmanuel Sierra Holguin",
    "email": "sierra@gmail.com"
}

respuesta (201 create)

{
    "success": true,
    "message": "Usuario creado exitosamente",
    "data": {
        "id": 2,
        "name": "Emmanuel Sierra Holguin",
        "email": "sierra@gmail.com"
    }
}
```

- 2. GET http://localhost:8000/api/v1/users (lista de usuarios)
```json
peticion (/users)

respuesta (200 ok)

{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "Usuario Demo",
            "email": "demo@mail.com"
        },
        {
            "id": 2,
            "name": "Emmanuel Sierra Holguin",
            "email": "sierra@gmail.com"
        }
    ]
}
```

-  3.GET http://localhost:8000/api/v1/users/2 (Buscar usuario por ID)
```json
peticion (/users/id)

respuesta (200 ok)
{
    "success": true,
    "data": {
        "id": 2,
        "name": "Emmanuel Sierra Holguin",
        "email": "sierra@gmail.com"
    }
}
```

- 4.PUT http://localhost:8000/api/v1/users/2 (remplazar)
```json
peticion (/users/id, es obligatorio rellenar todos los campos)
{
    "name": "emmanuel sierra Holguin",
    "email": "si@gmail"
}

respuesta (200 OK)
{
    "success": true,
    "message": "Usuario reemplazado completamente",
    "data": {
        "id": 2,
        "name": "emmanuel sierra Holguin",
        "email": "si@gmail"
    }
}
```

- 5.PATCH http://localhost:8000/api/v1/users/2 (actualizacion parcia)
```json
peticion (/users/id, no es obligatorio rellenar cada campo)
{
    "name": "emmanuel sierra"
}
respuesta (200 ok)

{
    "success": true,
    "message": "Usuario actualizado parcialmente",
    "data": {
        "id": 2,
        "name": "emmanuel sierra",
        "email": "si@gmail"
    }
}
```

- 6.DELETE http://localhost:8000/api/v1/users/2 (eliminar usuario)
```json
peticion (/users/id)

respuesta (204 No Content)
```

## workouts

- 1.POST http://localhost:8000/api/v1/workouts (crear entrenamiento)
```json
peticion(/workouts,rellenamos los campos)
{
  "userId": 2,
  "title": "Rutina de Hipertrofia - Torso",
  "description": "Sesión enfocada en empuje y tracción superior",
  "scheduledAt": "2026-09-15T08:00:00Z",
  "durationMinutes": 60,
  "status": "pending"
}
respuesta(201 Created)

{
    "success": true,
    "message": "Entrenamiento creado exitosamente",
    "data": {
        "id": 2,
        "userId": 2,
        "title": "Rutina de Hipertrofia - Torso",
        "description": "Sesión enfocada en empuje y tracción superior",
        "scheduledAt": "2026-09-15T08:00:00Z",
        "durationMinutes": 60,
        "status": "pending"
    }
}
```

- 2.GET http://localhost:8000/api/v1/workouts (todos los entrenamientos)
```json
peticion(/workouts)

respuesta (200 ok)

{
    "success": true,
    "data": [
        {
            "id": 1,
            "userId": 1,
            "title": "Rutina de Pecho y Tríceps",
            "description": "Enfoque en hipertrofia",
            "scheduledAt": "2026-09-20T10:00:00.000Z",
            "durationMinutes": 60,
            "status": "completed"
        },
        {
            "id": 2,
            "userId": 2,
            "title": "Rutina de Hipertrofia - Torso",
            "description": "Sesión enfocada en empuje y tracción superior",
            "scheduledAt": "2026-09-15T08:00:00Z",
            "durationMinutes": 60,
            "status": "pending"
        }
    ]
}
```

- 3.GET http://localhost:8000/api/v1/workouts/2 (buscar entrenamiento por id)
```json
peticion (/workouts/id)

respuesta (200 ok)
{
    "success": true,
    "data": {
        "id": 2,
        "userId": 2,
        "title": "Rutina de Hipertrofia - Torso",
        "description": "Sesión enfocada en empuje y tracción superior",
        "scheduledAt": "2026-09-15T08:00:00Z",
        "durationMinutes": 60,
        "status": "pending"
    }
}
```


- 4.PUT http://localhost:8000/api/v1/workouts/2 (reemplaza)
```json
peticion(/workouts/id,es obligatorio rellenar todos los campos requeridos)

{
  "userId": 1,
  "title": "Rutina de Fuerza - Pierna",
  "description": "Cuádriceps, isquiotibiales y pantorrilla",
  "scheduledAt": "2026-09-18T09:00:00Z",
  "durationMinutes": 75,
  "status": "completed"
}
respuesta(200 ok)

{
    "success": true,
    "message": "Entrenamiento reemplazado completamente",
    "data": {
        "id": 2,
        "userId": 1,
        "title": "Rutina de Fuerza - Pierna",
        "description": "Cuádriceps, isquiotibiales y pantorrilla",
        "scheduledAt": "2026-09-18T09:00:00Z",
        "durationMinutes": 75,
        "status": "completed"
    }
}
```

- 5.PATCH http://localhost:8000/api/v1/workouts/2 (actualiza)
```json 
peticion(/workouts/id, no requiere rellenar todos los campos)
{
  "status": "cancelled"
}
respuesta (200 ok)
{
    "success": true,
    "message": "Entrenamiento actualizado parcialmente exitosamente",
    "data": {
        "id": 2,
        "userId": 1,
        "title": "Rutina de Fuerza - Pierna",
        "description": "Cuádriceps, isquiotibiales y pantorrilla",
        "scheduledAt": "2026-09-18T09:00:00Z",
        "durationMinutes": 75,
        "status": "cancelled"
    }
}
```
- 6.DELETE http://localhost:8000/api/v1/workouts/2 (elimina entrenamiento)
```json
peticion (/workouts/2)

respuesta(204 No Content)
```

## exercises

- 1.POST http://localhost:8000/api/v1/exercises (creamos ejercicio)
```json
peticion(/exercises, llenamos los campos)
{
  "name": "Press de Banca",
  "description": "Ejercicio compuesto para pectoral mayor y tríceps con barra horizontal",
  "category": "Fuerza",
  "muscleGroup": "Pecho"
}
respuesta (201 Created)

{
    "success": true,
    "message": "Ejercicio creado exitosamente",
    "data": {
        "id": 2,
        "name": "Press de Banca",
        "description": "Ejercicio compuesto para pectoral mayor y tríceps con barra horizontal",
        "category": "Fuerza",
        "muscleGroup": "Pecho"
    }
}
```

- 2.GET http://localhost:8000/api/v1/exercises (lista de ejercicios)
```json
peticion (/exercises)

respuesta (200 OK)
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "Press de Banca",
            "description": "Ejercicio de pecho con barra",
            "category": "Fuerza",
            "muscleGroup": "Pecho"
        },
        {
            "id": 2,
            "name": "Press de Banca",
            "description": "Ejercicio compuesto para pectoral mayor y tríceps con barra horizontal",
            "category": "Fuerza",
            "muscleGroup": "Pecho"
        }
    ]
}
```

- 3.GET http://localhost:8000/api/v1/exercises/2 (buscamos ejercicio por id)
```json
peticion(/exercises/id)

respuesta (200 OK)
{
    "success": true,
    "data": {
        "id": 2,
        "name": "Press de Banca",
        "description": "Ejercicio compuesto para pectoral mayor y tríceps con barra horizontal",
        "category": "Fuerza",
        "muscleGroup": "Pecho"
    }
}
```

- 4.PUT http://localhost:8000/api/v1/exercises/2 (reemplazar)
```json
peticion (/exercises/id)
{
  "name": "Sentadilla Búlgara",
  "description": "Ejercicio unipodal centrado en cuádriceps y glúteos",
  "category": "Hipertrofia",
  "muscleGroup": "Pierna"
}
respuesta (200 OK)
{
    "success": true,
    "message": "Ejercicio reemplazado completamente",
    "data": {
        "id": 2,
        "name": "Sentadilla Búlgara",
        "description": "Ejercicio unipodal centrado en cuádriceps y glúteos",
        "category": "Hipertrofia",
        "muscleGroup": "Pierna"
    }
}
```

- 5.PATCH http://localhost:8000/api/v1/exercises/2 (actualizar)
```json
peticion (/exercises/id)
{
  "category": "Fuerza Máxima"
}
respuesta (200 OK)
{
    "success": true,
    "message": "Ejercicio actualizado parcialmente exitosamente",
    "data": {
        "id": 2,
        "name": "Sentadilla Búlgara",
        "description": "Ejercicio unipodal centrado en cuádriceps y glúteos",
        "category": "Fuerza Máxima",
        "muscleGroup": "Pierna"
    }
}
```
- 6.DELETE http://localhost:8000/api/v1/exercises/2 (eliminar ejercicio)
```json
peticion (/exercises/id)

respuesta (204 No Content)
```

## workoutse-xercises
(esta dentro de entrenamientos por tanto podemos buscar la lista o id por entrenamientos, el jemplo esta en workout)
- 1.POST http://localhost:8000/api/v1/workouts/2/exercises (juntar ejercicio con entrenamiento)
```json
peticion (/workouts/id/exercises)
{
  "exerciseId": 2,
  "sets": 4,
  "reps": 10,
  "weight": 75.0
}
respuesta(201 Created)
{
    "success": true,
    "message": "Ejercicio vinculado exitosamente al entrenamiento",
    "data": {
        "id": 2,
        "userId": 2,
        "title": "Rutina de Hipertrofia - Torso",
        "description": "Sesión enfocada en empuje y tracción superior",
        "scheduledAt": "2026-09-15T08:00:00Z",
        "durationMinutes": 60,
        "status": "pending",
        "exercises": [
            {
                "exerciseId": 2,
                "name": "Zancadas Búlgaras con Mancuernas",
                "sets": 4,
                "reps": 10,
                "weight": 75
            }
        ]
    }
}
```
- 2.PUT http://localhost:8000/api/v1/workouts/2/exercises/2 (reemplazar) 
```json
peticion (/workouts/id/exercises/id)

respuesta (200 OK)
{
    "success": true,
    "message": "Ejercicio del entrenamiento actualizado completamente",
    "data": {
        "id": 2,
        "userId": 2,
        "title": "Rutina de Hipertrofia - Torso",
        "description": "Sesión enfocada en empuje y tracción superior",
        "scheduledAt": "2026-09-15T08:00:00Z",
        "durationMinutes": 60,
        "status": "pending",
        "exercises": [
            {
                "exerciseId": 2,
                "name": "Zancadas Búlgaras con Mancuernas",
                "sets": 5,
                "reps": 12,
                "weight": 80
            }
        ]
    }
}
```
- 3.PATCH http://localhost:8000/api/v1/workouts/2/exercises/2 (actualizamos)
```json
peticion (/workouts/id/exercises/id)
{
  "sets": 8
}
respuesta (200 OK)
{
    "success": true,
    "message": "Ejercicio del entrenamiento actualizado parcialmente",
    "data": {
        "id": 2,
        "userId": 2,
        "title": "Rutina de Hipertrofia - Torso",
        "description": "Sesión enfocada en empuje y tracción superior",
        "scheduledAt": "2026-09-15T08:00:00Z",
        "durationMinutes": 60,
        "status": "pending",
        "exercises": [
            {
                "exerciseId": 2,
                "name": "Zancadas Búlgaras con Mancuernas",
                "sets": 8,
                "reps": 12,
                "weight": 80
            }
        ]
    }
}
```
- 4.DELETE http://localhost:8000/api/v1/workouts/2/exercises/2 (desvincular)
```json
peticion (/workouts/id/exercises/id)

respuesta(200ok)
{
    "success": true,
    "message": "Ejercicio eliminado del entrenamiento exitosamente",
    "data": {
        "id": 2,
        "userId": 2,
        "title": "Rutina de Hipertrofia - Torso",
        "description": "Sesión enfocada en empuje y tracción superior",
        "scheduledAt": "2026-09-15T08:00:00Z",
        "durationMinutes": 60,
        "status": "pending",
        "exercises": []
    }
}

```

## progress


- 1.POST http://localhost:8000/api/v1/progress (creamos registro de progreso)
```json
peticion (/progress)
{
  "userId": 2
}
respuesta (201 Created)
{
    "success": true,
    "data": {
        "id": 2,
        "userId": 2,
        "totalWorkouts": 1,
        "history": [
            {
                "workoutId": 2,
                "title": "Rutina de Hipertrofia - Torso",
                "scheduledAt": "2026-09-15T08:00:00Z",
                "status": "pending",
                "exercises": [
                    {
                        "exerciseId": 2,
                        "name": "Zancadas Búlgaras con Mancuernas",
                        "sets": 4,
                        "reps": 10,
                        "weight": 75
                    }
                ]
            }
        ],
        "createdAt": "2026-09-24T03:01:55.074Z"
    }
}
```

- 2.GET http://localhost:8000/api/v1/progress (obtenemos lista de progresos)
```json
peticion (/progress)

respuesta (200 OK
{
    "success": true,
    "data": {
        "id": 2,
        "userId": 2,
        "totalWorkouts": 1,
        "history": [
            {
                "workoutId": 2,
                "title": "Rutina de Hipertrofia - Torso",
                "scheduledAt": "2026-09-15T08:00:00Z",
                "status": "pending",
                "exercises": [
                    {
                        "exerciseId": 2,
                        "name": "Zancadas Búlgaras con Mancuernas",
                        "sets": 4,
                        "reps": 10,
                        "weight": 75
                    }
                ]
            }
        ],
        "createdAt": "2026-09-24T03:01:55.074Z"
    }
}
```

- 3.GET http://localhost:8000/api/v1/progress/2 (obtener progreso de id)
```json
peticion (/progress/id)

respuesta (200 OK)

{
    "success": true,
    "data": {
        "id": 2,
        "userId": 2,
        "totalWorkouts": 1,
        "history": [
            {
                "workoutId": 2,
                "title": "Rutina de Hipertrofia - Torso",
                "scheduledAt": "2026-09-15T08:00:00Z",
                "status": "pending",
                "exercises": [
                    {
                        "exerciseId": 2,
                        "name": "Zancadas Búlgaras con Mancuernas",
                        "sets": 4,
                        "reps": 10,
                        "weight": 75
                    }
                ]
            }
        ],
        "createdAt": "2026-09-24T03:01:55.074Z"
    }
}
```

- 4.PUT http://localhost:8000/api/v1/progress/2 (reemplazamos) 
```json
peticion (/progress/2)
{
  "userId": 1,
  "totalWorkouts": 2,
  "history": [
    {
      "workoutId": 1,
      "title": "Rutina de Pecho e Hipertrofia (Actualizada)",
      "scheduledAt": "2026-09-20T10:00:00.000Z",
      "status": "completed",
      "exercises": [
        {
          "exerciseId": 1,
          "name": "Press de Banca",
          "sets": 5,
          "reps": 8,
          "weight": 80.0
        }
      ]
    }
  ]
}
respuesta (200 OK)
{
    "success": true,
    "data": {
        "id": 2,
        "userId": 1,
        "totalWorkouts": 2,
        "history": [
            {
                "workoutId": 1,
                "title": "Rutina de Pecho e Hipertrofia (Actualizada)",
                "scheduledAt": "2026-09-20T10:00:00.000Z",
                "status": "completed",
                "exercises": [
                    {
                        "exerciseId": 1,
                        "name": "Press de Banca",
                        "sets": 5,
                        "reps": 8,
                        "weight": 80
                    }
                ]
            }
        ],
        "updatedAt": "2026-09-24T03:10:17.695Z"
    }
}

```

- 5.PATCH http://localhost:8000/api/v1/progress/2 (actualizar)
```json
peticion
{
  "totalWorkouts": 5
}
respuesta (200 OK)
{
    "success": true,
    "data": {
        "id": 2,
        "userId": 1,
        "totalWorkouts": 5,
        "history": [
            {
                "workoutId": 1,
                "title": "Rutina de Pecho e Hipertrofia (Actualizada)",
                "scheduledAt": "2026-09-20T10:00:00.000Z",
                "status": "completed",
                "exercises": [
                    {
                        "exerciseId": 1,
                        "name": "Press de Banca",
                        "sets": 5,
                        "reps": 8,
                        "weight": 80
                    }
                ]
            }
        ],
        "updatedAt": "2026-09-24T03:14:00.048Z"
    }
}
```

- 6.DELETE http://localhost:8000/api/v1/progress/2 (eliminar progreso)
```json
peticion (/progress/id)

respuesta (204 no Content)
```

## estados errores posibles

- 400 Bad Request — Datos Incompletos o Inválidos 
```json
peticion POST (/users)
{
    "name": "Emmanuel Sierra Holguin",
    "email": "sierra"
}

Respuesta(400)
{
    "success": false,
    "message": "El correo electrónico no es válido, debe contener un \"@\""
}
```
- 404 Not Found — Recurso No Encontrado
```json
peticion GET (/users/id)
respuesta(404)
{
    "success": false,
    "message": "Usuario no encontrado"
}

```

- 500 Internal Server Error — Error Interno del Servidor
```json
peticion GET (/progress)

respuesta(500)
{
    "success": false,
    "message": "db.progress is not iterable"
}
```


