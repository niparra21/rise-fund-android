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
    
    return { success: true, message: 'Donation inserted successfully' }; 
  } catch (error) {
      console.error('Error inserting donation:', error);
      return { success: false, message: 'Failed to insert donation' };
  }
};