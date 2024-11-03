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
    
    const result = await executeProcedure(procedureName, params);
    console.log('Controller:', result);
    if (result && result[0]) {
      console.log('New user added with ID:', result[0].NewUserID);
    } else {
      console.log('User creation failed.');
    }
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export default addUser;
