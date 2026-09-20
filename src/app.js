const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware para leer JSON
app.use(express.json());

// Ruta de prueba general
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bienvenido a la API de Workout Tracker v1' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});