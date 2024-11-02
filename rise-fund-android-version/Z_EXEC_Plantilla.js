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

