/**
 * Authentication Service
 * 
 * This service handles all authentication-related operations.
 * Currently uses mock data, but designed to be easily replaced with real backend API.
 * 
 * TODO: Backend Integration
 * - Replace mock login with: POST /api/auth/login
 * - Replace mock register with: POST /api/auth/register
 * - Replace mock logout with: POST /api/auth/logout
 * - Implement: POST /api/auth/refresh (token refresh)
 * - Implement: GET /api/auth/me (get current user)
 * - Implement OAuth flows: POST /api/auth/oauth/:provider
 */

import { getUserByEmail, MOCK_USERS, User, UserRole } from '../mocks/users';

const SESSION_STORAGE_KEY = 'mock_auth_session';
const USER_STORAGE_KEY = 'mock_auth_user';

export interface AuthSession {
  user: User;
  token: string; // Mock token
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name?: string;
}

export interface AuthError {
  message: string;
}

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Sign in with email and password
 */
export const signIn = async (credentials: LoginCredentials): Promise<{ session: AuthSession | null; error: AuthError | null }> => {
  await delay();

  const user = getUserByEmail(credentials.email);
  
  if (!user) {
    return {
      session: null,
      error: { message: 'Invalid email or password' },
    };
  }

  // Check password (in real app, this would be server-side)
  if (user.password !== credentials.password) {
    return {
      session: null,
      error: { message: 'Invalid email or password' },
    };
  }

  // Create session
  const session: AuthSession = {
    user: { ...user, password: undefined as any }, // Never expose password
    token: `mock_token_${Date.now()}`, // Mock JWT token
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  };

  // Store in localStorage (simulates secure cookie)
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session.user));

  return { session, error: null };
};

/**
 * Sign up with email and password
 */
export const signUp = async (data: RegisterData): Promise<{ session: AuthSession | null; error: AuthError | null }> => {
  await delay();

  // Check if email already exists
  const existingUser = getUserByEmail(data.email);
  if (existingUser) {
    return {
      session: null,
      error: { message: 'Email already registered' },
    };
  }

  // Create new user (in real app, this would be server-side)
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: data.email,
    password: data.password,
    role: 'user', // Default role
    full_name: data.full_name || null,
    username: null,
    display_name: data.full_name || null,
    bio: null,
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Add to mock database
  MOCK_USERS.push(newUser);

  // Create session
  const session: AuthSession = {
    user: { ...newUser, password: undefined as any },
    token: `mock_token_${Date.now()}`,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session.user));

  return { session, error: null };
};

/**
 * Sign out
 */
export const signOut = async (): Promise<void> => {
  await delay(200);
  localStorage.removeItem(SESSION_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
};

/**
 * Get current session
 */
export const getSession = async (): Promise<AuthSession | null> => {
  await delay(200);
  
  const sessionData = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionData) return null;

  try {
    const session: AuthSession = JSON.parse(sessionData);
    
    // Check if session expired
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    return null;
  }
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(USER_STORAGE_KEY);
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};

/**
 * OAuth sign in (mocked)
 */
export const signInWithOAuth = async (provider: 'github' | 'google'): Promise<{ error: AuthError | null }> => {
  await delay();
  
  // In a real app, this would redirect to OAuth provider
  // For mock, we'll just return an error
  return {
    error: { message: `OAuth with ${provider} is not available in demo mode` },
  };
};

/**
 * Check if user has specific role
 */
export const hasRole = (user: User | null, role: UserRole): boolean => {
  return user?.role === role;
};

/**
 * Check if user is admin
 */
export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, 'admin');
};
