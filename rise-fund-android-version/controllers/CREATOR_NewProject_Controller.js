import { executeProcedure } from '../database/apiService';

export const createNewProject = async (  
    userId,
    title,
    description,
    contributionGoal,
    amountGathered = 0,
    start,
    end,
    status,
    category,
    ) => {
    try {
        const procedureName = 'sp_add_project';
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
        console.error('Error creating new project:', error);
        throw error;
    }
}
