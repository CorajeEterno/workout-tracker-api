require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'workout_tracker',
    port: process.env.DB_PORT || 3306
  }
};