import { executeProcedure, sendEmail } from '../database/apiService';

const getUserInfo = async (givenID) => {
  try {
    const procedureName = 'sp_get_user_by_id';
    const params = { UserID: givenID };
    const result = await executeProcedure(procedureName, params);

    if (result[0].length !== 0) {
      // Devuelve los datos del usuario obtenidos
      return result[0][0];
    } else {
      alert('User Not Found. No user found with the provided ID.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user information:', error);
    alert('Error retrieving user information. Please try again later.');
    return null;
  }
};

export const sendSupportTicket = async (name, inquiry, userID) => {
  if (!name || !inquiry) {
    alert('Please fill out all fields.');
    return;
  }
  
  console.log('Hola Nico');
  const userInfo = await getUserInfo(userID);
  if (!userInfo) return;

  const subject = `Support Ticket from ${name}`;
  const text = `User ${userInfo.FirstName} has submitted the following inquiry:\n\n${inquiry}`;
  
  try {
    await sendEmail('risefund1@gmail.com', subject, text);
    alert('Email sent successfully!');
  } catch (error) {
    alert('Failed to send email. Please try again later.');
    console.error('API error:', error);
  }
};
