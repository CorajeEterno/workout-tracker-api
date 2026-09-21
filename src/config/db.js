const mysql = require('mysql2/promise');
// Importamos el objeto db desde nuestro archivo de configuración
const { db } = require('./env'); 

// Creamos el pool usando exclusivamente el objeto importado
const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  port: db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;