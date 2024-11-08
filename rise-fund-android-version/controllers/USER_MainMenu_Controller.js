import { executeProcedure } from '../database/apiService';
export const getActiveUserCount = async () => {
    try {
      const result = await executeProcedure('sp_get_active_user_count',{});
      return result[0][0].ActiveUserCount; // Suponiendo que el procedimiento devuelva un campo 'count'
    } catch (error) {
      console.error('Error fetching active user count:', error);
      throw error;
    }
  };

export const getProjectCount = async () => {
    try {
        const result = await executeProcedure('sp_get_project_count',{});
        return result[0][0].ProjectCount; // Suponiendo que el procedimiento devuelva un campo 'count'
    } catch (error) {
        console.error('Error fetching project count:', error);
        throw error;
    }
};

export const getDonationsByStatus = async () => {
    try {
        const result = await executeProcedure('sp_get_donations_by_status',{});
        return result[0][0].TotalAcceptedDonations; // Suponiendo que el procedimiento devuelva una lista con las cantidades por estado
    } catch (error) {
        console.error('Error fetching donations by status:', error);
        throw error;
    }
};