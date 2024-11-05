// ADMIN_User_Controller.js
import { executeProcedure } from '../database/apiService';

export const getAllUsers = async () => {
  try {
    const procedureName = 'sp_get_user_details';
    const params = { };
    const result = await executeProcedure(procedureName, params);
    // Devuelve los registros obtenidos del procedimiento almacenado.
    return result[0];
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const getUserInfo = async (givenID) => {
    try {
      const procedureName = 'sp_get_user_by_id';
      const params = { UserID: givenID };
      const result = await executeProcedure(procedureName, params);
  
      if (result[0].length !== 0) {
        // Devuelve los datos del usuario obtenidos
        return result[0][0];
      } else {
        Alert.alert(
          'User Not Found',
          'No user found with the provided ID.',
          [{ text: 'OK' }]
        );
        return null;
      }
    } catch (error) {
      console.error('Error retrieving user information:', error);
      Alert.alert(
        'Error',
        'There was an error retrieving user information. Please try again later.',
        [{ text: 'OK' }]
      );
      return null;
    }
  };

export const getAllRoles = async () => {
    try {
      const procedureName = 'sp_get_all_roles';
      const params = {}; 
      const result = await executeProcedure(procedureName, params);
      
      return result[0]; // Devuelve los datos de todos los roles
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  };