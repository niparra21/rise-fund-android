import { executeProcedure } from '../database/apiService';

export const handleGetForumComments = async (forumID) => {
    try{
        const procedureName = 'sp_get_forum_comments';
        const params = { forumID: forumID };
        const result = await executeProcedure(procedureName, params);

        if (result[0].length !== 0) {
            return result[0];
        } else {
        console.log('No se encontraron comentarios');
        return [];  
        }
    } catch (error) {
        console.error('Error obteniendo foro:', error);
        return []; 
    }
    
}


export const handleInsertComment = async (UserId, Type, IdRefForum, Content)  => {
    try {
      const procedureName = 'sp_add_comment';
      const params = {
        UserId: UserId,
        Type: Type,
        IdRefForum: IdRefForum,
        Content: Content
      };
      const result = await executeProcedure(procedureName, params);
      
      return { success: true, message: 'Comment inserted successfully' }; 
    } catch (error) {
        console.error('Error inserting comment:', error);
        return { success: false, message: 'Failed to insert donation' };
    }
};