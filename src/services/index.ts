/**
 * Services Index
 * 
 * Central export point for all services.
 * Makes it easy to import services in components.
 * 
 * Usage:
 * import { authService, userService } from '../../services';
 * 
 * TODO: Backend Integration
 * - This file structure can remain the same
 * - Just update individual service implementations
 */

import * as authService from './auth.service';
import * as userService from './user.service';
import * as projectService from './project.service';
import * as blogService from './blog.service';
import * as commentService from './comment.service';
import * as likeService from './like.service';

export {
  authService,
  userService,
  projectService,
  blogService,
  commentService,
  likeService,
};

// Re-export types for convenience
export type { AuthSession, LoginCredentials, RegisterData, AuthError } from './auth.service';
export type { UpdateProfileData } from './user.service';
export type { LikeData } from './like.service';
