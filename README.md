# Workout Tracker API

API RESTful desarrollada en Node.js y Express para la gestión de usuarios, entrenamientos, ejercicios y registro de progreso.

## Tecnologías Utilizadas
- XAMPP(ayuda a crear la base de datos y que esta almacene datos)
- extension visual studio code-MySQL-Database-clien.com
- nodemon(actualiza cambios,notifica errores de servidor)
- Node.js & Express
- MySQL2 (Pool de conexiones)
- Dotenv (Variables de entorno)

## 📂 Estructura del Proyecto

```text
workout-tracker-api/
├── src/
│   ├── config/       # Configuración de base de datos y entorno
│   ├── controllers/  # Lógica de negocio y controladores CRUD
│   ├── routes/v1/    # Enrutador central y rutas de la API (v1)
│   ├── app.js        # Configuración de la aplicación Express
│   └── index.js      # Punto de entrada del servidor
├── .env              # Variables de entorno confidenciales
├── .gitignore        # Archivos y carpetas ignorados por Git
├── .nvmrc       # version de node utilizada en el desarrollo del proyecto
├── package.json      # Dependencias, scripts y metadatos del proyecto
└── README.md         # Documentación oficial de la API
```

# Tabla de Endpoints

## 📌 Documentación de la API

Base URL: `/api/v1`

---

### 👤 Usuarios (`/api/v1/users`)

| Método | Endpoint | Función Controlador | Descripción | Respuestas |
|:---:|---|---|---|:---:|
| `GET` | `/api/v1/users` | `getUsers` | Obtiene la lista completa de usuarios | `200`, `500` |
| `POST` | `/api/v1/users` | `createUser` | Registra un nuevo usuario | `201`, `400`, `500` |
| `GET` | `/api/v1/users/:id` | `getUserById` | Obtiene un usuario por su ID | `200`, `404`, `500` |
| `PUT` | `/api/v1/users/:id` | `updateUser` | Actualiza la información de un usuario | `200`, `400`, `404` |
| `DELETE` | `/api/v1/users/:id` | `deleteUser` | Elimina un usuario del sistema | `200`, `404`, `500` |

---

### 🏋️‍♂️ Entrenamientos (`/api/v1/workouts`)

| Método | Endpoint | Función Controlador | Descripción | Respuestas |
|:---:|---|---|---|:---:|
| `POST` | `/api/v1/workouts` | `createWorkout` | Registra un nuevo entrenamiento | `201`, `400`, `500` |
| `GET` | `/api/v1/workouts` | `getWorkouts` | Lista entrenamientos *(filtros: `?status=`, `?date=`)* | `200`, `500` |
| `GET` | `/api/v1/workouts/:id` | `getWorkoutById` | Obtiene un entrenamiento específico por ID | `200`, `404`, `500` |
| `PUT` | `/api/v1/workouts/:id` | `updateWorkout` | Actualiza los datos de un entrenamiento | `200`, `404`, `500` |
| `DELETE` | `/api/v1/workouts/:id` | `deleteWorkout` | Elimina un entrenamiento | `200`, `404`, `500` |
| `POST` | `/api/v1/workouts/:workoutId/exercises` | `addExerciseToWorkout` | Asocia un ejercicio a la rutina (`sets`, `reps`, `weight`) | `201`, `404`, `500` |
| `GET` | `/api/v1/workouts/:workoutId/exercises` | `getExercisesByWorkout` | Consulta ejercicios asociados a una rutina | `200`, `500` |
| `PUT` | `/api/v1/workouts/:workoutId/exercises/:id` | `updateWorkoutExercise` | Modifica datos del ejercicio dentro de la rutina | `200`, `404`, `500` |
| `DELETE` | `/api/v1/workouts/:workoutId/exercises/:id` | `removeExerciseFromWorkout` | Remueve un ejercicio de la rutina | `200`, `404`, `500` |

---

### 🤸 Ejercicios (`/api/v1/exercises`)

| Método | Endpoint | Función Controlador | Descripción | Respuestas |
|:---:|---|---|---|:---:|
| `GET` | `/api/v1/exercises` | `getExercises` | Obtiene el catálogo completo de ejercicios | `200`, `500` |
| `GET` | `/api/v1/exercises/:id` | `getExerciseById` | Consulta el detalle de un ejercicio por ID | `200`, `404`, `500` |
| `POST` | `/api/v1/exercises` | `createExercise` | Crea un nuevo ejercicio en el catálogo | `201`, `400`, `500` |
| `PUT` | `/api/v1/exercises/:id` | `updateExercise` | Edita la información de un ejercicio | `200`, `404`, `500` |
| `DELETE` | `/api/v1/exercises/:id` | `deleteExercise` | Elimina un ejercicio del catálogo | `200`, `404`, `500` |

---

### 📈 Reportes de Progreso (`/api/v1/progress`)

| Método | Endpoint | Función Controlador | Descripción | Respuestas |
|:---:|---|---|---|:---:|
| `GET` | `/api/v1/progress` | `getAllProgressReports` | Consulta historial global de reportes de progreso | `200`, `500` |
| `POST` | `/api/v1/progress` | `generateProgressReport` | Genera un reporte de progreso *(requiere `userId` en Body)* | `201`, `400`, `404` |
| `GET` | `/api/v1/progress/users/:userId` | `getProgressReportsByUser` | Obtiene reportes asociados a un usuario específico | `200`, `500` |
| `PUT` | `/api/v1/progress/:id` | `updateProgressReport` | Modifica un reporte de progreso por ID | `200`, `404`, `500` |
| `DELETE` | `/api/v1/progress/:id` | `deleteProgressReport` | Elimina un reporte de progreso por ID | `200`, `404`, `500` |

## Ejemplo de Petición y Respuesta

### POST `/api/v1/workouts`
**Request (JSON):**
```json
{
  "name": "Rutina de Pecho",
  "description": "Ejercicios enfocados en hipertrofia pectoral"
}

 1. `POST` `/api/v1/users` (Crear Usuario)
**Request (JSON):**

{
  "name": "Emmanuel Sierra",
  "email": "emmanuel@example.com",
}
Response (JSON):

JSON
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "id": 1,
    "name": "Emmanuel Sierra",
    "email": "emmanuel@example.com",
  }
}
2. GET /api/v1/users (Listar todos los Usuarios)
Request: No requiere cuerpo.

Response (JSON):

JSON
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Emmanuel Sierra",
      "email": "emmanuel@example.com",
    }
  ]
}
3. GET /api/v1/users/:id (Obtener Usuario por ID)
Request: No requiere cuerpo. (Ejemplo de URL: /api/v1/users/1)

Response (JSON):

JSON
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Emmanuel Sierra",
    "email": "emmanuel@example.com",
  }
}
4. PUT /api/v1/users/:id (Actualizar Usuario)
Request (JSON): (Ejemplo de URL: /api/v1/users/1)

JSON
{
  "name": "Emmanuel Sierra Holguin",
  "email": "emmanuel.sierra@example.com",
}
Response (JSON):

JSON
{
  "success": true,
  "message": "Usuario actualizado exitosamente"
}
5. DELETE /api/v1/users/:id (Eliminar Usuario)
Request: No requiere cuerpo. (Ejemplo de URL: /api/v1/users/1)

Response (JSON):

JSON
{
  "success": true,
  "message": "Usuario eliminado exitosamente"
}
