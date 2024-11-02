// database/databaseService.js
const { sql, connectToDatabase } = require('./dbConfig');

// Función para ejecutar un procedimiento almacenado con parámetros en SQL Server
const executeProcedure = async (procedureName, params = {}) => {
  let pool;
  try {
    pool = await connectToDatabase();
    const request = pool.request();

    // Agrega cada parámetro al request
    for (const [key, value] of Object.entries(params)) {
      request.input(key, value);
    }

    // Ejecuta el procedimiento almacenado
    const result = await request.execute(procedureName);
    return result.recordsets;
  } catch (error) {
    console.error('Error ejecutando el procedimiento almacenado:', error);
    throw error;
  } finally {
    if (pool) {
      await pool.close(); // Cierra la conexión después de ejecutar el procedimiento
    }
  }
};
module.exports = { executeProcedure };