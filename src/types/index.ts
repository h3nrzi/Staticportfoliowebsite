/**
 * Shared TypeScript Types
 * 
 * This file contains all shared type definitions used across the application.
 * These types should match the backend API response types.
 * 
 * TODO: Backend Integration
 * - Generate these types from backend API schema (OpenAPI/Swagger)
 * - Or use a shared types package between frontend and backend
 */

// Re-export from mocks (will be replaced with API types later)
export type { User, UserRole } from '../mocks/users';
export type { Project } from '../mocks/projects';
export type { BlogPost } from '../mocks/blogs';
export type { Comment, EntityType } from '../mocks/comments';
export type { Like } from '../mocks/likes';

// Auth types
export interface AuthSession {
  user: import('../mocks/users').User;
  token: string;
  expiresAt: string;
}

export interface AuthError {
  message: string;
}
