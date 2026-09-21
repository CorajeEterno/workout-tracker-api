// Importa la librería Express para crear y gestionar el servidor web
const express = require('express');

// Carga las variables de entorno del archivo .env dentro de process.env
require('dotenv').config();

// Inicializa la instancia principal de la aplicación Express
const app = express();

// Define el puerto: usa la variable de entorno PORT o asigna el 8000 por defecto
const PORT = process.env.PORT || 8000;

// Middleware para procesar y entender las peticiones que contienen datos en formato JSON
// Middleware para leer JSON
app.use(express.json());

// ===========================================
// CONECTAR LAS RUTAS DE LA API V1
// ===========================================
// Importa el enrutador principal de la versión 1 desde la carpeta /routes/v1
const v1Router = require('./routes/v1');

// Registra las rutas de la versión 1 bajo el prefijo base '/api/v1'
app.use('/api/v1', v1Router);

// Ruta de prueba general
// Endpoint GET en la raíz '/' para verificar que el servidor responde correctamente
app.get('/', (req, res) => {
    // Devuelve un código HTTP 200 (éxito) y un objeto JSON con el mensaje de bienvenida
    res.status(200).json({ message: 'Bienvenido a la API de Workout Tracker v1' });
});

// Iniciar servidor
// Enciende el servidor para que empiece a escuchar peticiones en el puerto asignado
app.listen(PORT, () => {
    // Imprime en la consola la URL donde se encuentra corriendo la aplicación
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});