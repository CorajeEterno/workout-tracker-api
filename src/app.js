const express = require('express');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

const v1Router = require('./routes/v1');

app.use('/api/v1', v1Router);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenido a la API de Workout Tracker v1' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});