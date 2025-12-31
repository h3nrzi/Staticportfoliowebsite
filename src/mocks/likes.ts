/**
 * Mock Likes Data
 * 
 * TODO: Replace with real backend API
 * - GET /api/likes?entity_type=:type&entity_id=:id
 * - POST /api/likes
 * - DELETE /api/likes/:id
 * - GET /api/likes/user/:userId
 */

export type EntityType = 'project' | 'blog';

export interface Like {
  id: string;
  entity_type: EntityType;
  entity_id: string;
  user_id: string;
  created_at: string;
}

// In-memory storage for likes (simulates database)
let mockLikesStore: Like[] = [
  {
    id: 'like-1',
    entity_type: 'project',
    entity_id: 'project-1',
    user_id: 'user-2',
    created_at: new Date('2024-01-20').toISOString(),
  },
  {
    id: 'like-2',
    entity_type: 'project',
    entity_id: 'project-1',
    user_id: 'user-3',
    created_at: new Date('2024-01-21').toISOString(),
  },
  {
    id: 'like-3',
    entity_type: 'project',
    entity_id: 'project-2',
    user_id: 'user-2',
    created_at: new Date('2024-02-05').toISOString(),
  },
  {
    id: 'like-4',
    entity_type: 'project',
    entity_id: 'project-2',
    user_id: 'user-3',
    created_at: new Date('2024-02-06').toISOString(),
  },
  {
    id: 'like-5',
    entity_type: 'project',
    entity_id: 'project-4',
    user_id: 'user-2',
    created_at: new Date('2024-03-05').toISOString(),
  },
  {
    id: 'like-6',
    entity_type: 'blog',
    entity_id: 'blog-1',
    user_id: 'user-3',
    created_at: new Date('2024-01-12').toISOString(),
  },
  {
    id: 'like-7',
    entity_type: 'blog',
    entity_id: 'blog-1',
    user_id: 'user-1',
    created_at: new Date('2024-01-13').toISOString(),
  },
  {
    id: 'like-8',
    entity_type: 'blog',
    entity_id: 'blog-2',
    user_id: 'user-3',
    created_at: new Date('2024-02-07').toISOString(),
  },
];

// Get likes for an entity
export const getLikesByEntity = (entityType: EntityType, entityId: string): Like[] => {
  return mockLikesStore.filter(
    l => l.entity_type === entityType && l.entity_id === entityId
  );
};

// Get like count for an entity
export const getLikeCount = (entityType: EntityType, entityId: string): number => {
  return getLikesByEntity(entityType, entityId).length;
};

// Check if user has liked
export const hasUserLiked = (entityType: EntityType, entityId: string, userId: string): boolean => {
  return mockLikesStore.some(
    l => l.entity_type === entityType && l.entity_id === entityId && l.user_id === userId
  );
};

// Add a like
export const addLike = (entityType: EntityType, entityId: string, userId: string): Like | null => {
  // Prevent duplicate likes
  if (hasUserLiked(entityType, entityId, userId)) {
    return null;
  }

  const newLike: Like = {
    id: `like-${Date.now()}`,
    entity_type: entityType,
    entity_id: entityId,
    user_id: userId,
    created_at: new Date().toISOString(),
  };
  
  mockLikesStore.push(newLike);
  return newLike;
};

// Remove a like
export const removeLike = (entityType: EntityType, entityId: string, userId: string): boolean => {
  const index = mockLikesStore.findIndex(
    l => l.entity_type === entityType && l.entity_id === entityId && l.user_id === userId
  );
  
  if (index === -1) return false;
  
  mockLikesStore.splice(index, 1);
  return true;
};

// Get all likes by user
export const getLikesByUser = (userId: string): Like[] => {
  return mockLikesStore.filter(l => l.user_id === userId);
};

// Get all likes (admin only)
export const getAllLikes = (): Like[] => {
  return [...mockLikesStore];
};
