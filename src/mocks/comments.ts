/**
 * Mock Comments Data
 * 
 * TODO: Replace with real backend API
 * - GET /api/comments?entity_type=:type&entity_id=:id
 * - POST /api/comments
 * - PUT /api/comments/:id
 * - DELETE /api/comments/:id
 */

export type EntityType = 'project' | 'blog';

export interface Comment {
  id: string;
  entity_type: EntityType;
  entity_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// In-memory storage for comments (simulates database)
let mockCommentsStore: Comment[] = [
  {
    id: 'comment-1',
    entity_type: 'project',
    entity_id: 'project-1',
    user_id: 'user-2',
    content: 'Great project! The e-commerce features are really well implemented.',
    created_at: new Date('2024-01-20').toISOString(),
    updated_at: new Date('2024-01-20').toISOString(),
  },
  {
    id: 'comment-2',
    entity_type: 'project',
    entity_id: 'project-1',
    user_id: 'user-3',
    content: 'Love the UI design. Very clean and modern!',
    created_at: new Date('2024-01-21').toISOString(),
    updated_at: new Date('2024-01-21').toISOString(),
  },
  {
    id: 'comment-3',
    entity_type: 'project',
    entity_id: 'project-2',
    user_id: 'user-2',
    content: 'The real-time updates work flawlessly. Impressive work!',
    created_at: new Date('2024-02-05').toISOString(),
    updated_at: new Date('2024-02-05').toISOString(),
  },
  {
    id: 'comment-4',
    entity_type: 'blog',
    entity_id: 'blog-1',
    user_id: 'user-3',
    content: 'Very helpful tutorial! Thanks for sharing.',
    created_at: new Date('2024-01-12').toISOString(),
    updated_at: new Date('2024-01-12').toISOString(),
  },
  {
    id: 'comment-5',
    entity_type: 'blog',
    entity_id: 'blog-1',
    user_id: 'user-1',
    content: 'Great introduction to React. Well explained!',
    created_at: new Date('2024-01-13').toISOString(),
    updated_at: new Date('2024-01-13').toISOString(),
  },
  {
    id: 'comment-6',
    entity_type: 'blog',
    entity_id: 'blog-2',
    user_id: 'user-3',
    content: 'These TypeScript tips are gold. Using them in my project now.',
    created_at: new Date('2024-02-07').toISOString(),
    updated_at: new Date('2024-02-07').toISOString(),
  },
];

// Get comments for an entity
export const getCommentsByEntity = (entityType: EntityType, entityId: string): Comment[] => {
  return mockCommentsStore.filter(
    c => c.entity_type === entityType && c.entity_id === entityId
  ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

// Add a comment
export const addComment = (comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>): Comment => {
  const newComment: Comment = {
    ...comment,
    id: `comment-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockCommentsStore.push(newComment);
  return newComment;
};

// Update a comment
export const updateComment = (id: string, content: string): Comment | null => {
  const index = mockCommentsStore.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  mockCommentsStore[index] = {
    ...mockCommentsStore[index],
    content,
    updated_at: new Date().toISOString(),
  };
  return mockCommentsStore[index];
};

// Delete a comment
export const deleteComment = (id: string): boolean => {
  const index = mockCommentsStore.findIndex(c => c.id === id);
  if (index === -1) return false;
  
  mockCommentsStore.splice(index, 1);
  return true;
};

// Get all comments (admin only)
export const getAllComments = (): Comment[] => {
  return [...mockCommentsStore].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};
