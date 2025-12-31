/**
 * Like Service
 * 
 * This service handles all like-related operations.
 * Currently uses mock data, but designed to be easily replaced with real backend API.
 * 
 * TODO: Backend Integration
 * - Replace with: GET /api/likes?entity_type=:type&entity_id=:id
 * - Replace with: POST /api/likes
 * - Replace with: DELETE /api/likes (remove like)
 * - Replace with: GET /api/likes/check?entity_type=:type&entity_id=:id&user_id=:userId
 */

import {
  getLikesByEntity,
  getLikeCount as getLikeCountFromMock,
  hasUserLiked as hasUserLikedFromMock,
  addLike as addLikeToMock,
  removeLike as removeLikeFromMock,
  getLikesByUser as getLikesByUserFromMock,
  getAllLikes as getAllLikesFromMock,
  Like,
  EntityType
} from '../mocks/likes';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export interface LikeData {
  count: number;
  hasLiked: boolean;
}

/**
 * Get like data for an entity
 */
export const getLikeData = async (
  entityType: EntityType,
  entityId: string,
  userId?: string
): Promise<{ data: LikeData; error: Error | null }> => {
  await delay();
  
  try {
    const count = getLikeCountFromMock(entityType, entityId);
    const hasLiked = userId ? hasUserLikedFromMock(entityType, entityId, userId) : false;

    return {
      data: { count, hasLiked },
      error: null,
    };
  } catch (error) {
    return {
      data: { count: 0, hasLiked: false },
      error: error as Error,
    };
  }
};

/**
 * Toggle like (add or remove)
 */
export const toggleLike = async (
  entityType: EntityType,
  entityId: string,
  userId: string
): Promise<{ data: { liked: boolean; count: number } | null; error: Error | null }> => {
  await delay();
  
  try {
    const hasLiked = hasUserLikedFromMock(entityType, entityId, userId);

    if (hasLiked) {
      // Remove like
      const success = removeLikeFromMock(entityType, entityId, userId);
      if (!success) {
        return { data: null, error: new Error('Failed to remove like') };
      }
      
      const count = getLikeCountFromMock(entityType, entityId);
      return {
        data: { liked: false, count },
        error: null,
      };
    } else {
      // Add like
      const like = addLikeToMock(entityType, entityId, userId);
      if (!like) {
        return { data: null, error: new Error('Failed to add like') };
      }
      
      const count = getLikeCountFromMock(entityType, entityId);
      return {
        data: { liked: true, count },
        error: null,
      };
    }
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Get all likes by user
 */
export const getUserLikes = async (userId: string): Promise<{ data: Like[]; error: Error | null }> => {
  await delay();
  
  try {
    const likes = getLikesByUserFromMock(userId);
    return { data: likes, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};

/**
 * Get all likes (admin only)
 */
export const getAllLikes = async (): Promise<{ data: Like[]; error: Error | null }> => {
  await delay();
  
  try {
    const likes = getAllLikesFromMock();
    return { data: likes, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};
