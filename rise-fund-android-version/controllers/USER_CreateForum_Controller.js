import { executeProcedure } from '../database/apiService';

export const createForum = async (Type, UserId, Title, Content) => {
    try {
        const procedureName = 'sp_add_forum';
        const parameters = { Type: Type, UserId: UserId, Title: Title, Content: Content };
        await executeProcedure(procedureName, parameters);
    } catch (error) {
        console.log('Error creating forum:', error);
    }
};