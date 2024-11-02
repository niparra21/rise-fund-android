// controllers/apiService.js
import axios from 'axios';

const API_URL = 'https://risefundfunctions.azurewebsites.net/api/ExecuteProcedure?code=a8nW8rTReF0LdVFDyWM8Kml8lypy8GlOFfd2d9170aMYAzFu2BohzQ%3D%3D';

export const executeProcedure = async (procedureName, params) => {
  try {
    const response = await axios.post(API_URL, {
      procedureName,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error ejecutando el procedimiento desde el servidor:', error);
    throw error;
  }
};
