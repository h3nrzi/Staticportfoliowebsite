/**
 * Authentication Context (Static/Mocked)
 * 
 * This context provides authentication state and methods throughout the application.
 * Currently uses mock data and localStorage, but designed to be easily replaced with real backend.
 * 
 * TODO: Backend Integration
 * - Replace mock auth service with real API calls
 * - Implement proper JWT token handling
 * - Add token refresh logic
 * - Implement secure session management
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/auth.service';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: { message: string } | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: { message: string } | null }>;
  signOut: () => Promise<void>;
  signInWithOAuth: (provider: 'github' | 'google') => Promise<{ error: { message: string } | null }>;
  isAdmin: () => boolean;
  hasRole: (role: UserRole) => boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await authService.getSession();
        if (session) {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { session, error } = await authService.signIn({ email, password });
      
      if (error) {
        return { error };
      }

      if (session) {
        setUser(session.user);
      }

      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message || 'Sign in failed' } };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { session, error } = await authService.signUp({ email, password, full_name: fullName });
      
      if (error) {
        return { error };
      }

      if (session) {
        setUser(session.user);
      }

      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message || 'Sign up failed' } };
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      // Clear state even if signOut fails
      setUser(null);
    }
  };

  const signInWithOAuth = async (provider: 'github' | 'google') => {
    try {
      const { error } = await authService.signInWithOAuth(provider);
      return { error };
    } catch (error: any) {
      return { error: { message: error.message || 'OAuth sign in failed' } };
    }
  };

  const isAdmin = () => {
    return authService.isAdmin(user);
  };

  const hasRole = (role: UserRole) => {
    return authService.hasRole(user, role);
  };

  const refreshUser = async () => {
    try {
      const session = await authService.getSession();
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithOAuth,
    isAdmin,
    hasRole,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
