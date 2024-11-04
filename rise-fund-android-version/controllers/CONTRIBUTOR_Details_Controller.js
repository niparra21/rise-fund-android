// controllers/CONTRIBUTOR_Menu_Controller.js
// controllers/CONTRIBUTOR_Menu_Controller.js
import { executeProcedure } from '../database/apiService';

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