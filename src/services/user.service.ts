/**
 * User Service
 * 
 * This service handles all user-related operations.
 * Currently uses mock data, but designed to be easily replaced with real backend API.
 * 
 * TODO: Backend Integration
 * - Replace with: GET /api/users
 * - Replace with: GET /api/users/:id
 * - Replace with: PUT /api/users/:id
 * - Replace with: POST /api/users/:id/avatar (file upload)
 * - Replace with: GET /api/users/username/:username/available
 */

import { getAllUsers, getUserById, isUsernameAvailable, MOCK_USERS, User } from '../mocks/users';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export interface UpdateProfileData {
  username?: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
}

/**
 * Get all users (admin only)
 */
export const getUsers = async (): Promise<{ data: User[]; error: Error | null }> => {
  await delay();
  
  try {
    const users = getAllUsers();
    return { data: users, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};

/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId: string): Promise<{ data: User | null; error: Error | null }> => {
  await delay();
  
  try {
    const user = getUserById(userId);
    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (
  userId: string,
  updates: UpdateProfileData
): Promise<{ data: User | null; error: Error | null }> => {
  await delay();
  
  try {
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { data: null, error: new Error('User not found') };
    }

    // Update user
    MOCK_USERS[userIndex] = {
      ...MOCK_USERS[userIndex],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    // Update localStorage if this is the current user
    const currentUserData = localStorage.getItem('mock_auth_user');
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      if (currentUser.id === userId) {
        const { password, ...userWithoutPassword } = MOCK_USERS[userIndex];
        localStorage.setItem('mock_auth_user', JSON.stringify(userWithoutPassword));
      }
    }

    const { password, ...userWithoutPassword } = MOCK_USERS[userIndex];
    return { data: userWithoutPassword as User, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Upload avatar (mocked - just returns a preview URL)
 */
export const uploadAvatar = async (
  userId: string,
  file: File
): Promise<{ data: string | null; error: Error | null }> => {
  await delay(1000); // Longer delay to simulate upload
  
  try {
    // In a real app, this would upload to cloud storage
    // For mock, we'll create a local preview URL
    const previewUrl = URL.createObjectURL(file);
    
    // Also use dicebear as fallback
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}-${Date.now()}`;
    
    return { data: avatarUrl, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Check if username is available
 */
export const checkUsernameAvailable = async (
  username: string,
  excludeUserId?: string
): Promise<{ available: boolean; error: Error | null }> => {
  await delay(300);
  
  try {
    const available = isUsernameAvailable(username, excludeUserId);
    return { available, error: null };
  } catch (error) {
    return { available: false, error: error as Error };
  }
};

/**
 * Delete user (admin only)
 */
export const deleteUser = async (userId: string): Promise<{ success: boolean; error: Error | null }> => {
  await delay();
  
  try {
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: new Error('User not found') };
    }

    // Don't allow deleting admin user
    if (MOCK_USERS[userIndex].role === 'admin') {
      return { success: false, error: new Error('Cannot delete admin user') };
    }

    MOCK_USERS.splice(userIndex, 1);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

/**
 * Update user role (admin only)
 */
export const updateUserRole = async (
  userId: string,
  role: 'admin' | 'user'
): Promise<{ data: User | null; error: Error | null }> => {
  await delay();
  
  try {
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { data: null, error: new Error('User not found') };
    }

    MOCK_USERS[userIndex] = {
      ...MOCK_USERS[userIndex],
      role,
      updated_at: new Date().toISOString(),
    };

    const { password, ...userWithoutPassword } = MOCK_USERS[userIndex];
    return { data: userWithoutPassword as User, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};
