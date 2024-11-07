import { Alert } from 'react-native';
import { executeProcedure } from '../database/apiService';

export const getCommunityForums = async () => {
    try {
        const procedureName = 'sp_get_general_platform_forums';
        const params = {};
        const result = await executeProcedure(procedureName, params);
        return result[0];
    } catch {
        Console.log('Error at getting community forums');
        return null;
    }
}

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
