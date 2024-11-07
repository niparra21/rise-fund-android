import { executeProcedure } from '../database/apiService';

export const getUnacknowledgedAlerts = async () => {
  try {
    const procedureName = 'sp_get_unacknowledged_alerts';
    const params = {};
    const result = await executeProcedure(procedureName, params);
    return result[0]; // Retorna los resultados de la consulta
  } catch (error) {
    console.error('Error fetching unacknowledged alerts:', error);
    throw error;
  }
};
export const acknowledgeAlert = async (alertId) => {
    try {
      const procedureName = 'sp_acknowledge_alert';
      const params = {
        AlertID: alertId,
      };
  
      const result = await executeProcedure(procedureName, params);
      const message = result[0]?.Message || 'Unknown response';
  
      return { success: true, message };
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      return { success: false, message: 'Error acknowledging the alert.' };
    }
  };