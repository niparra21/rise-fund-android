import { executeProcedure } from '../database/apiService';

export const editProject = async (  
    userId,
    title,
    description,
    contributionGoal,
    amountGathered,
    start,
    end,
    status,
    category,
    ) => {
    try {
        const procedureName = 'sp_update_project';
        const params = {
            UserId: userId,
            Title: title,
            Description: description,
            ContributionGoal: contributionGoal,
            AmountGathered: amountGathered,
            Start: start,
            End: end,
            Status: status,
            Category: category,
        };
        const result = await executeProcedure(procedureName, params);
        return result;
    } catch (error) {
        console.error('Error editing project:', error);
        throw error;
    }
}


export const getProjectDetails = async (projectId) => {
    try {
        const procedureName = 'sp_get_project_info_by_project_id';
        const params = { projectId: projectId };
        const result = await executeProcedure(procedureName, params);
        console.log(result[0][0]);
        return result[0][0];
    } catch (error) {
        console.error('Error getting project details:', error);
        throw error;   
    }
}