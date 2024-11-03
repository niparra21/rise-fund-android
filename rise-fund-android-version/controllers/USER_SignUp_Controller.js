import { executeProcedure } from '../database/apiService';

export const addUser = async ({ ID, RoleId, Email, FirstName, SecondName, PhoneNumber, WorkArea, Password, Status }) => {
  try {
    const procedureName = 'sp_add_user';
    const params = { 
      ID, 
      RoleId, 
      Email, 
      FirstName, 
      SecondName, 
      PhoneNumber, 
      WorkArea, 
      Password, 
      Status 
    };
    console.log(params);
    const result = await executeProcedure(procedureName, params);
    if (result[0].length !== 0) {
      console.log('New user added with ID:', result[0][0].NewUserID);
      return(result);
    } else {
      console.log('User creation failed.');
      return(result);
    }
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const getUserIfExist = async (givenID) => {
  try {
    const procedureName = 'sp_get_user_by_id';
    const params = { UserID: givenID };
    const result = await executeProcedure(procedureName, params);

    if (result[0].length !== 0) {
      // Devuelve los datos del usuario obtenidos
      console.log('Id NO Disponible');
      return result;
    } else {
      console.log('Id Disponible');
      return result;
    }
  } catch (error) {
    console.error('Error obteniendo información del usuario:', error);
    Alert.alert(
      'Error',
      'There was an error retrieving user information. Please try again later.',
      [{ text: 'OK' }]
    );
    return null;
  }
};