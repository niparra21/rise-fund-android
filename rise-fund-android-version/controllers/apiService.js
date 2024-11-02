// controllers/apiService.js
import axios from 'axios';

const API_URL = 'http://192.168.100.47:3000'; // Danielo
// const API_URL = 'http://192.168.222.40:3000'; // Fran
// const API_URL = 'http://192.168.100.6:3000'; // Jimmy

/**/

export const executeProcedure = async (procedureName, params) => {
  try {
    const response = await axios.post(`${API_URL}/executeProcedure`, {
      procedureName,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error ejecutando el procedimiento desde el servidor:', error);
    throw error;
  }
};
