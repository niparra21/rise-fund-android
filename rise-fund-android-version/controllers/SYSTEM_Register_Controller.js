//./controllers/SYSTEM_Register_Controller.js
import { executeProcedure } from '../database/apiService';
import { Alert } from 'react-native';

const getLocalDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  export const insertRegister = async (type, detail) => {
    try {
      const dateTime = getLocalDateTime(); // Usa la hora local en formato 'yyyy-mm-dd hh:mm:ss'
      const procedureName = 'sp_insert_register';
      const params = {
        Type: type,
        DateTime: dateTime,
        Detail: detail,
      };
      const result = await executeProcedure(procedureName, params);
      return result; // Retorna el resultado si es necesario
    } catch (error) {
      console.error('Error inserting new register:', error);
      throw error;
    }
  };