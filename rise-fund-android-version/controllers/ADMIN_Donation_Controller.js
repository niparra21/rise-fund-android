import { executeProcedure } from '../database/apiService';

export const getAllDonations = async () => {
  try {
    const procedureName = 'sp_get_all_donations';
    const params = {};
    const donations = await executeProcedure(procedureName, params);
    return donations;
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
};

export const approveDonation = async (donationId) => {
    try {
      const procedureName = 'sp_approve_donation';
      const params = { DonationID: donationId };
      
      const result = await executeProcedure(procedureName, params);
      return result?.[0]?.Message || 'Donation status updated successfully.';
    } catch (error) {
      console.error('Error approving donation:', error);
      throw new Error('Failed to approve donation');
    }
};

export const addFundsToProject = async (projectId, amountToAdd) => {
    try {
      const procedureName = 'sp_add_funds_to_project';
      const params = {
        ProjectID: projectId,
        AmountToAdd: amountToAdd,
      };
  
      const result = await executeProcedure(procedureName, params);
      return result?.[0]?.Message || 'Funds added successfully.';
    } catch (error) {
      console.error('Error adding funds to project:', error);
      throw new Error('Failed to add funds to project');
    }
};

export const deleteDonation = async (donationId) => {
    try {
      const procedureName = 'sp_delete_donation';
      const params = { DonationID: donationId };
  
      const result = await executeProcedure(procedureName, params);
      return result?.[0]?.Message || 'Donation deleted successfully.';
    } catch (error) {
      console.error('Error deleting donation:', error);
      throw new Error('Failed to delete donation');
    }
};

export const addFundsToUserBalance = async (userId, amountToAdd) => {
    try {
      const procedureName = 'sp_add_funds_to_balance';
      const params = {
        UserId: userId,
        AmountToAdd: amountToAdd,
      };
  
      const result = await executeProcedure(procedureName, params);
      const UserInfo = await getUserInfo(userId);
      await SendCustomEmail(UserInfo.Email, "Donation Declined", 
        `Dear ${UserInfo.FirstName}, we declined a donation of yours, haha get wreckt`);
      return result?.[0]?.Message || 'Funds added successfully to the balance.';
    } catch (error) {
      console.error('Error adding funds to user balance:', error);
      throw new Error('Failed to add funds to user balance');
    }
};

const SendCustomEmail = async (toWho, subject, body) => {
    try {
        await sendEmail(toWho, subject, body);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const getUserInfo = async (givenID) => {
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