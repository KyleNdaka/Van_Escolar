const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testar a conexão ao iniciar o ambiente
pool.getConnection()
  .then(conn => {
    console.log('✅ Conexão com o MySQL realizada com sucesso!');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar no banco de dados:', err.message);
  });

module.exports = pool;
