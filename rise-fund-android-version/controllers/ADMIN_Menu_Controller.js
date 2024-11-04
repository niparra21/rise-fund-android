import { executeProcedure } from '../database/apiService';

export const getLast20RegistersByType = async (type) => {
    try {
      const procedureName = 'sp_get_last_20_registers_by_type';
      const params = { Type: type };
  
      const result = await executeProcedure(procedureName, params);
      
      // Devuelve los registros obtenidos del procedimiento almacenado.
      return result[0];
    } catch (error) {
      console.error('Error fetching last 20 registers by type:', error);
      throw error;
    }
  };
