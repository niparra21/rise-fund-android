// controllers/USER_Config_Controller.js
import { executeProcedure } from '../database/apiService';
import { Alert } from 'react-native';

export const getUserInfo = async (givenID) => {
  try {
    const procedureName = 'sp_get_user_by_id';
    const params = { UserID: givenID };
    const result = await executeProcedure(procedureName, params);

    if (result[0].length !== 0) {
      // Devuelve los datos del usuario obtenidos
      return result[0][0];
    } else {
      console.log('Usuario no encontrado');
      Alert.alert(
        'User Not Found',
        'No user found with the provided ID.',
        [{ text: 'OK' }]
      );
      return null;
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

export const verifyAndUpdateUserInfo = async (
    userId, 
    roleId, 
    email, 
    firstName, 
    secondName, 
    phoneNumber, 
    workArea, 
    oldPassword, 
    newPassword, 
    confirmNewPassword, 
    storedPassword,
    status
  ) => {
    try {
      if (oldPassword !== storedPassword) {
        return { success: false, message: 'La contraseña antigua no coincide.' };
      }
  
      if (newPassword !== confirmNewPassword) {
        return { success: false, message: 'La nueva contraseña no coincide con la confirmación.' };
      }
      
      if (!firstName || !/^[A-Za-z]+$/.test(firstName)) {
        return { success: false, message: 'El nombre no puede estar vacío y debe contener solo letras.' };
      }
  
      if (!secondName || !/^[A-Za-z]+$/.test(secondName)) {
        return { success: false, message: 'El segundo nombre no puede estar vacío y debe contener solo letras.' };
      }
  
      if (!email || !email.endsWith('@estudiantec.cr')) {
        return { success: false, message: 'El email debe terminar en @estudiantec.cr.' };
      }
  
      if (!phoneNumber || phoneNumber.length !== 8 || !/^\d+$/.test(phoneNumber)) {
        return { success: false, message: 'El número de teléfono debe tener exactamente 8 dígitos.' };
      }
  
      if (!workArea) {
        return { success: false, message: 'El área de trabajo no puede estar vacía.' };
      }
      
      // Ejecución del procedimiento de actualización si todas las verificaciones pasan
      const procedureName = 'sp_update_user_info'; // Asegúrate de tener este procedimiento en la base de datos
      const params = {
        UserID: userId,
        RoleId: roleId,
        Email: email,
        FirstName: firstName,
        SecondName: secondName,
        PhoneNumber: phoneNumber,
        WorkArea: workArea,
        Password: newPassword || storedPassword, // Usa la nueva contraseña o la antigua si no se cambió
        Status: status,
      };
  
      const result = await executeProcedure(procedureName, params);
      return { success: true, message: 'Información actualizada correctamente.' };
    } catch (error) {
      console.error('Error al verificar y actualizar la información del usuario:', error);
      return { success: false, message: 'Error al actualizar la información del usuario.' };
    }
};