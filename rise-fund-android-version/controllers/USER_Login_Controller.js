// controllers/User_Login_Controller.js
import { executeProcedure } from '../database/apiService';
import {Alert} from 'react-native';
import { getUserInfo, verifyAndUpdateUserInfo } from './USER_Config_Controller';

export const handleSignIn = async (email, password, signIn) => {
  try {
    const procedureName = 'sp_get_user_id_by_email_password';
    const params = { Email: email, Password: password };
    const result = await executeProcedure(procedureName, params);

    if (result[0].length !== 0) {
      // Llama a signIn con el ID del usuario si las credenciales son correctas
      const userInfo = await getUserInfo(result[0][0].ID);
      console.log(userInfo);
        if (!userInfo.Status) {
            Alert.alert(
            'Account Blocked',
            'Your account has been blocked.',
            [{ text: 'OK' }])
        } else{
          signIn(result[0][0].ID);
        }
    } else {
      console.log('Credenciales inválidas');
      Alert.alert(
        'Invalid Credentials',
        'The email or password you entered is incorrect. Please try again.',
        [{ text: 'OK' }]
      );
    }
  } catch (error) {
    console.error('Error iniciando sesión:', error);
  }
};
