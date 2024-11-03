// controllers/CONTRIBUTOR_Menu_Controller.js
import { executeProcedure } from '../database/apiService';


export const handleGetProjects = async () => {
    try {
      const procedureName = 'sp_get_contributors_menu_info_of_projects';
      const params = {};
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
  