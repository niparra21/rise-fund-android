const { executeProcedure } = require('./database/databaseService');

const runTest = async () => {
    try {
        const procedureName = 'sp_get_user_id_by_email_password';
        const params = {
            Email: 'john.doe@example.com',
            Password: 'securePassword123',
        };

        const result = await executeProcedure(procedureName, params);
        console.log('Resultado del procedimiento:', result);
    } catch (error) {
        console.error('Error en la prueba de conexión:', error);
    }
};

runTest();