import { executeProcedure } from '../database/apiService';

const addUser = async ({ ID, RoleId, Email, FirstName, SecondName, PhoneNumber, WorkArea, Password, Status }) => {
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

export default addUser;
