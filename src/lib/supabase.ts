import { createClient } from '@supabase/supabase-js';

// Environment variables - set these in your environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'YOUR_SUPABASE_URL' && 
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';

// Show a warning if Supabase is not configured
if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Supabase is not configured. Authentication features will not work.\n' +
    'To enable authentication:\n' +
    '1. Create a .env.local file in the root directory\n' +
    '2. Add your Supabase credentials:\n' +
    '   VITE_SUPABASE_URL=your-project-url\n' +
    '   VITE_SUPABASE_ANON_KEY=your-anon-key\n' +
    '3. See SUPABASE_SETUP.md for detailed instructions'
  );
}

// Create a single supabase client for interacting with your database
// Use dummy values if not configured to prevent initialization errors
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYwNjcyNjcsImV4cCI6MTk2MTY0MzI2N30.placeholder',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

// Export configuration status
export { isSupabaseConfigured };

// Type definitions for user roles
export type UserRole = 'admin' | 'user';

// Database types
export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}