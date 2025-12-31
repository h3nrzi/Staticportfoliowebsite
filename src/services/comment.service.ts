/**
 * Comment Service
 * 
 * This service handles all comment-related operations.
 * Currently uses mock data, but designed to be easily replaced with real backend API.
 * 
 * TODO: Backend Integration
 * - Replace with: GET /api/comments?entity_type=:type&entity_id=:id
 * - Replace with: POST /api/comments
 * - Replace with: PUT /api/comments/:id
 * - Replace with: DELETE /api/comments/:id
 */

import { 
  getCommentsByEntity, 
  addComment as addCommentToMock, 
  updateComment as updateCommentInMock,
  deleteComment as deleteCommentFromMock,
  getAllComments as getAllCommentsFromMock,
  Comment,
  EntityType 
} from '../mocks/comments';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get comments for an entity
 */
export const getComments = async (
  entityType: EntityType,
  entityId: string
): Promise<{ data: Comment[]; error: Error | null }> => {
  await delay();
  
  try {
    const comments = getCommentsByEntity(entityType, entityId);
    return { data: comments, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};

/**
 * Add a comment
 */
export const addComment = async (
  userId: string,
  entityType: EntityType,
  entityId: string,
  content: string
): Promise<{ data: Comment | null; error: Error | null }> => {
  await delay();
  
  try {
    if (!content.trim()) {
      return { data: null, error: new Error('Comment content cannot be empty') };
    }

    const newComment = addCommentToMock({
      user_id: userId,
      entity_type: entityType,
      entity_id: entityId,
      content: content.trim(),
    });

    return { data: newComment, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Update a comment
 */
export const updateComment = async (
  commentId: string,
  content: string,
  userId: string
): Promise<{ data: Comment | null; error: Error | null }> => {
  await delay();
  
  try {
    if (!content.trim()) {
      return { data: null, error: new Error('Comment content cannot be empty') };
    }

    // In a real app, the backend would verify ownership
    // For now, we'll trust the client-side check
    const updatedComment = updateCommentInMock(commentId, content.trim());
    
    if (!updatedComment) {
      return { data: null, error: new Error('Comment not found') };
    }

    return { data: updatedComment, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Delete a comment
 */
export const deleteComment = async (
  commentId: string,
  userId: string
): Promise<{ success: boolean; error: Error | null }> => {
  await delay();
  
  try {
    // In a real app, the backend would verify ownership or admin status
    // For now, we'll trust the client-side check
    const success = deleteCommentFromMock(commentId);
    
    if (!success) {
      return { success: false, error: new Error('Comment not found') };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

/**
 * Get all comments (admin only)
 */
export const getAllComments = async (): Promise<{ data: Comment[]; error: Error | null }> => {
  await delay();
  
  try {
    const comments = getAllCommentsFromMock();
    return { data: comments, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};
