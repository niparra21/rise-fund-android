// ADMIN_Project_Controller.js
import { executeProcedure } from '../database/apiService';

export const getAllProjects = async () => {
    try {
        const procedureName = 'sp_get_all_projects';
        const params = {};
        const result = await executeProcedure(procedureName, params);

        // Devuelve la lista de proyectos obtenida del procedimiento almacenado
        return result[0];
    } catch (error) {
        console.error('Error fetching all projects:', error);
        throw error;
    }
};

export const getAllProjectStatus = async () => {
    try {
        const procedureName = 'sp_get_all_project_status';
        const params = {};
        const result = await executeProcedure(procedureName, params);

        // Devuelve la lista de estados de proyectos obtenida del procedimiento almacenado
        return result[0];
    } catch (error) {
        console.error('Error fetching project statuses:', error);
        throw error;
    }
};

export const updateProjectStatus = async (projectId, newStatusId) => {
    try {
        const procedureName = 'sp_update_project_status';
        const params = {
            ProjectID: projectId,
            NewStatusID: newStatusId
        };

        const result = await executeProcedure(procedureName, params);
        console.log(result);
        // Verifica si la respuesta contiene un mensaje de éxito
        if (result && result[0] && result[0][0] && result[0][0].Message === 'Project status updated successfully.') {
            return { success: true, message: result[0][0].Message };
        } else {
            return { success: false, message: result[0]?.[0]?.Message || 'Error updating project status.' };
        }        
    } catch (error) {
        console.error('Error updating project status:', error);
        return { success: false, message: 'Error updating project status.' };
    }
};