import { executeProcedure } from '../database/apiService';

export const getUserProjects = async (userId) => {
  try {
    const procedureName = 'sp_get_projects_by_user';
    const params = {UserId : userId};
    const result = await executeProcedure(procedureName, params);
    //console.log(result);
    if (result[0].length !== 0) {
        return result[0];
    } else {
      console.log('No projects found for this user.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching user projects:', error);
    return [];
  }
};
