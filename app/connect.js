const mysql = require('mysql');
const dbConfig = require('./config/database');

// const { promisify } = require('util');
// const pool = mysql.createPool(dbConfig);

// pool.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('Database connection was closed');
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('Database has to many connections');
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('Database connection was refused');
//         }
//     }
//     if (connection) connection.release();
//     console.log('Database is connected');
//     return;
// });

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    multipleStatements: true
});

connection.connect(error => {
    if (error) throw error;
    console.log('Base de datos conectada');
});

// pool.query = promisify(pool.query);

module.exports = connection;
// module.exports = pool;