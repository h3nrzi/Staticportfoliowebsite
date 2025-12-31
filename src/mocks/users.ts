/**
 * Mock Users Data
 * 
 * TODO: Replace with real backend API
 * - GET /api/users
 * - GET /api/users/:id
 * - PUT /api/users/:id
 */

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  password: string; // In real app, this would NEVER be stored client-side
  role: UserRole;
  full_name: string | null;
  username: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Mock users database
export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'admin@example.com',
    password: 'admin123', // Demo only - never store passwords like this!
    role: 'admin',
    full_name: 'Admin User',
    username: 'admin',
    display_name: 'Admin User',
    bio: 'System administrator',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'user-2',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
    full_name: 'John Doe',
    username: 'johndoe',
    display_name: 'John Doe',
    bio: 'Software engineer and tech enthusiast',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'user-3',
    email: 'jane@example.com',
    password: 'user123',
    role: 'user',
    full_name: 'Jane Smith',
    username: 'janesmith',
    display_name: 'Jane Smith',
    bio: 'Frontend developer and designer',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    created_at: new Date('2024-02-01').toISOString(),
    updated_at: new Date('2024-02-01').toISOString(),
  },
];

// Get all users
export const getAllUsers = (): User[] => {
  return MOCK_USERS.map(user => ({
    ...user,
    password: undefined as any, // Don't expose passwords
  })).filter(u => u !== null);
};

// Get user by ID
export const getUserById = (id: string): User | null => {
  const user = MOCK_USERS.find(u => u.id === id);
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

// Get user by email
export const getUserByEmail = (email: string): User | null => {
  return MOCK_USERS.find(u => u.email === email) || null;
};

// Check if username is available
export const isUsernameAvailable = (username: string, excludeUserId?: string): boolean => {
  return !MOCK_USERS.some(u => u.username === username && u.id !== excludeUserId);
};
