// controllers/CONTRIBUTOR_Details_Controller.js
import { executeProcedure } from '../database/apiService';

// Obtiene  los datos del proyecto en que ingreso
export const handleGetProjectById = async (projectId) => {
    try {
      const procedureName = 'sp_get_project_info_by_project_id';
      const params = {projectId : projectId};
      const result = await executeProcedure(procedureName, params);
  
      if (result[0].length !== 0) {
        return result[0];
      } else {
        console.log('No se encontraron proyectos');
        return [];  
      }
    } catch (error) {
        console.error('Error obteniendo proyectos:', error);
        return []; 
    }
};

// Inserta la donacion en la base de datos
export const handleInsertDonation = async (userId, projectId, amount, comment) => {
  try {
      const procedureName = 'sp_insert_donation';
      const params = {
          UserID: userId,
          ProjectID: projectId,
          Amount: amount,
          Comment: comment
      };
      await executeProcedure(procedureName, params); 

      return { success: true, message: 'Donation inserted successfully' }; 
  } catch (error) {
      console.error('Error inserting donation:', error);
      return { success: false, message: 'Failed to insert donation' };
  }
};

// Actualiza el balance dentro de la base de datos
export const handleUpdateAccountBalance = async (userId, amount) => {
  try {
      const procedureName = 'sp_update_account_balance';
      const params = {
          UserId: userId, 
          amount: amount
      };
      await executeProcedure(procedureName, params); 
      return { success: true, message: 'Account balance updated successfully' }; 
  } catch (error) {
      console.error('Error updating account balance:', error);
      return { success: false, message: 'Failed to update account balance' };
  }
};

// Obtiene los datos de la cuenta del usuario
export const handleGetPaymentAccountData = async (UserID) => {
  try {
    const procedureName = 'sp_get_payment_data_by_id';
    const params = {
      UserID: UserID
    };
    const result = await executeProcedure(procedureName, params);
    return result[0];
  }  catch (error) {
    console.error('Error getting payment account data:', error);
    return [];
  };
};

// Obtiene los datos del usuario por ID
export const handleGetUserById = async (UserID)  => {
  try  {
    const procedureName = 'sp_get_user_by_id';
    const params = {
      UserID: UserID
    };
    const result = await executeProcedure(procedureName, params);
    return result[0];
    } catch (error) {
      console.error('Error getting user by id:', error);
      return [];
    };
}

// Obtiene los comentarios del proyecto actual por ID
export const handleGetProjectComments = async (projectId) => {
  try {
        const procedureName = 'sp_get_project_comments_by_project_id';
        const params = {projectId : projectId};
        const result = await executeProcedure(procedureName, params);
    
        if (result[0].length !== 0) {
          return result[0];
        } else {
          console.log('No se encontraron comentarios');
          return [];  
        }
      } catch (error) {
          console.error('Error obteniendo proyectos:', error);
          return []; 
      }
  };

export const handleInsertComment = async (UserId, Type, IdRefProject, Content)  => {
  try {
    const procedureName = 'sp_add_comment';
    const params = {
      UserId: UserId,
      Type: Type,
      IdRefProject: IdRefProject,
      Content: Content
    };
    const result = await executeProcedure(procedureName, params);
    
    return { success: true, message: 'Comment inserted successfully' }; 
  } catch (error) {
      console.error('Error inserting comment:', error);
      return { success: false, message: 'Failed to insert donation' };
  }
};

export const handleInsertRating = async (ProjectID, UserId, Rate) => {
  try {
      const procedureName = 'sp_insert_rating';
      const params = {
          ProjectID: ProjectID,
          UserId: UserId,
          Rate: Rate
      };
      const result = await executeProcedure(procedureName, params);

      return { success: true, message: 'Rating inserted successfully' };
  } catch (error) {
      console.error('Error inserting rating:', error);
      return { success: false, message: 'Failed to insert rating' };
  }
};
