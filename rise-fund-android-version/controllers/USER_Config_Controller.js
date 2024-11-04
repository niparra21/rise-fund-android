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

export const getUserAccountInfo = async (userId) => {
  try {
    const procedureName = 'sp_get_payment_account_by_user_id'; // Asegúrate de que este SP esté en la base de datos
    const params = { UserId: userId };
    const result = await executeProcedure(procedureName, params);
    return result[0][0]; // Devuelve la primera fila con la información de la cuenta
  } catch (error) {
    console.error('Error fetching user account info:', error);
    throw error;
  }
};




 const getAccountInfoByAccountNumber = async (accountNumber) => {
  try {
    const procedureName = 'sp_get_account_info_by_account_number'; // Asegúrate de que este SP esté en la base de datos
    const params = { AccountNumber: accountNumber };
    const result = await executeProcedure(procedureName, params);
    return result[0]; // Devuelve la primera fila con la información de la cuenta
  } catch (error) {
    console.error('Error fetching account info by account number:', error);
    throw error;
  }
};

export const generateUniqueAccountNumber = async () => {
  let isUnique = false;
  let accountNumber;
  
  while (!isUnique) {
    // Genera un número de cuenta aleatorio de 16 dígitos
    accountNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
    // Verifica si el número de cuenta ya existe
    const existingAccount = await getAccountInfoByAccountNumber(accountNumber);
    if (existingAccount.length == 0) {
      isUnique = true;
    }
  }

  return accountNumber;
};

export const insertPaymentAccount = async (accountNumber, userId, cardNumber, expirationDate, securityNumber, balance) => {
  try {
    const procedureName = 'sp_insert_payment_account';
    const params = {
      AccountNumber: accountNumber,
      UserId: userId,
      CardNumber: cardNumber,
      ExpirationDate: expirationDate,
      SecurityNumber: securityNumber,
      Balance: balance,
      Status: 1 // Activo por defecto
    };

    const result = await executeProcedure(procedureName, params);
    return result; // Devuelve el resultado de la inserción
  } catch (error) {
    console.error('Error inserting payment account:', error);
    throw error;
  }
};

export const updatePaymentAccount = async (accountNumber, cardNumber, expirationDate, securityNumber, balance, status) => {
  try {
    const procedureName = 'sp_update_payment_account';
    const params = {
      AccountNumber: accountNumber,
      CardNumber: cardNumber,
      ExpirationDate: expirationDate,
      SecurityNumber: securityNumber,
      Balance: balance,
      Status: status
    };

    const result = await executeProcedure(procedureName, params);
    return result; // Devuelve el resultado de la actualización
  } catch (error) {
    console.error('Error updating payment account:', error);
    throw error;
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
      // Verifica si el usuario desea cambiar la contraseña
      if (newPassword || confirmNewPassword) {
        if (oldPassword !== storedPassword) {
          return { success: false, message: 'The old password does not match.' };
        }

        if (newPassword !== confirmNewPassword) {
          return { success: false, message: 'The new password does not match the confirmation.' };
        }
      }

      // Validaciones adicionales para otros campos
      if (!firstName || !/^[A-Za-z\s]+$/.test(firstName)) {
        return { success: false, message: 'First name cannot be empty and must contain only letters and spaces.' };
      }

      if (!secondName || !/^[A-Za-z\s]+$/.test(secondName)) {
        return { success: false, message: 'Second name cannot be empty and must contain only letters and spaces.' };
      }

      if (!email || !email.endsWith('@estudiantec.cr')) {
        return { success: false, message: 'The email must end with @estudiantec.cr.' };
      }

      if (!phoneNumber || phoneNumber.length !== 8 || !/^\d+$/.test(phoneNumber)) {
        return { success: false, message: 'The phone number must have exactly 8 digits.' };
      }

      if (!workArea) {
        return { success: false, message: 'The work area cannot be empty.' };
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
      return { success: true, message: 'Information updated successfully.' };
    } catch (error) {
      console.error('Error verifying and updating user information:', error);
      return { success: false, message: 'Error updating user information.' };
    }
};
