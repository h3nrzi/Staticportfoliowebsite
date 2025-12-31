import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if credentials are provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Database Types
export interface Comment {
  id: string;
  project_slug: string;
  name: string;
  email?: string;
  message: string;
  created_at: string;
  approved: boolean;
}

export interface ProjectView {
  id: string;
  project_slug: string;
  count: number;
}

export interface ProjectLike {
  id: string;
  project_slug: string;
  count: number;
}