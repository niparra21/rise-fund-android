import { executeProcedure } from '../database/apiService';

const execute = async (/* parametros */) => {
    try {
      const procedureName = 'sp_get_user_id_by_email_password';
      const params = { Email: email, Password: password };
      const result = await executeProcedure(procedureName, params);
      console.log(result);
      if (result[0].length != 0) {
        //Si tiene tuplas...
      } else {
        //Si no tiene nada...
      }
    } catch (error) {
      console.error('Error iniciando sesión:', error);
    }
  };


//Para recuperar el id del usuario

//import React, { useContext } from 'react';
//import { AuthContext } from '../AuthContext'; // Ajusta la ruta según la ubicación de AuthContext.js

//Dentro de la funcion:::
//const { userID } = useContext(AuthContext);

//Registros
//View:
import {insertRegister} from '../controllers/SYSTEM_Register_Controller'
const handleInsertRegister = async (type, detail) => {
  try {
    await insertRegister(type, detail);
  } catch (error) {
    console.error('Error inserting register:', error);
  }
};
//Llamada:
await handleInsertRegister(1, `User ${userID} updated their info`); // 1 Usuario - 2 Donacion - 3 Proyecto



//Plantilla para enviar Correos
import { sendEmail } from '../database/apiService';
const SendCustomEmail = async (toWho, subject, body) => {
  try {
    await sendEmail(toWho, subject, body);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
//Llamada
await SendCustomEmail(toWho, subject, body);
//toWho: correo del receptor del correo
//subject: titulo del correo
//body: cuerpo del correo



//Para crear alertas
import { executeProcedure } from '../database/apiService';
export const createAlert = async (dateTime, detail) => {
  try {
    const procedureName = 'sp_create_alert';
    const params = {
      DateTime: dateTime,
      Detail: detail,
    };

    const result = await executeProcedure(procedureName, params);
    return result[0]?.Message || 'Alert created successfully.';
  } catch (error) {
    console.error('Error creating alert:', error);
    throw new Error('Error creating alert');
  }
};
//Llamada
const handleCreateAlert = async () => {
  if (!alertDetail) {
    Alert.alert('Error', 'Please enter the alert detail.');
    return;
  }
  
  try {
    const date = new Date();
    date.setHours(date.getHours() - 6); // Ajusta a UTC-6 para Costa Rica
    const dateTime = date.toISOString().slice(0, 19).replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'
    
    const resultMessage = await createAlert(dateTime, alertDetail);
    Alert.alert('Success', resultMessage);
    setAlertDetail(''); // Limpia el campo después de crear la alerta
  } catch (error) {
    console.error('Error creating alert:', error);
    Alert.alert('Error', 'There was an issue creating the alert.');
  }
};
