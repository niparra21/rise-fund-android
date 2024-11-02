// database/dbConfig.js
const sql = require('mssql');

const config = {
    user: 'app_user',
    password: 'riseFund!@012344',
    server: 'risefundexpress.database.windows.net',
    database: 'RiseFund',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(config);
        console.log('Conectado a la base de datos');
        return pool;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
};

module.exports = { sql, connectToDatabase };