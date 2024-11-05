import { executeProcedure } from '../database/apiService';
import {insertRegister} from '../controllers/SYSTEM_Register_Controller'
const handleInsertRegister = async (type, detail) => {
  try {
    await insertRegister(type, detail);
  } catch (error) {
    console.error('Error inserting register:', error);
  }
};

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
      await handleInsertRegister(1, `User ${result[0][0].NewUserID} created their account!`); // 1 Usuario - 2 Donacion - 3 Proyecto
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