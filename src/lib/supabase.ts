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
  username?: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Comment interface for projects and blog posts
export interface Comment {
  id: string;
  user_id: string;
  item_id: string; // project id or blog post id
  item_type: 'project' | 'blog';
  content: string;
  created_at: string;
  updated_at: string;
  profile?: Profile; // Joined profile data
}

// Like interface for projects and blog posts
export interface Like {
  id: string;
  user_id: string;
  item_id: string;
  item_type: 'project' | 'blog';
  created_at: string;
}

// Profile operations
export const profileService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  async checkUsernameAvailable(username: string, excludeUserId?: string) {
    let query = supabase
      .from('profiles')
      .select('id')
      .eq('username', username);
    
    if (excludeUserId) {
      query = query.neq('id', excludeUserId);
    }
    
    const { data, error } = await query;
    return { available: !data || data.length === 0, error };
  },

  async uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      return { data: null, error: uploadError };
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return { data: data.publicUrl, error: null };
  }
};

// Comment operations
export const commentService = {
  async getComments(itemId: string, itemType: 'project' | 'blog') {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profile:profiles(*)
      `)
      .eq('item_id', itemId)
      .eq('item_type', itemType)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async addComment(userId: string, itemId: string, itemType: 'project' | 'blog', content: string) {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        user_id: userId,
        item_id: itemId,
        item_type: itemType,
        content
      })
      .select(`
        *,
        profile:profiles(*)
      `)
      .single();
    
    return { data, error };
  },

  async updateComment(commentId: string, content: string) {
    const { data, error } = await supabase
      .from('comments')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', commentId)
      .select(`
        *,
        profile:profiles(*)
      `)
      .single();
    
    return { data, error };
  },

  async deleteComment(commentId: string) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);
    
    return { error };
  },

  subscribeToComments(itemId: string, itemType: 'project' | 'blog', callback: (payload: any) => void) {
    return supabase
      .channel(`comments:${itemType}:${itemId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `item_id=eq.${itemId}`
        },
        callback
      )
      .subscribe();
  }
};

// Like operations
export const likeService = {
  async getLikes(itemId: string, itemType: 'project' | 'blog') {
    const { data, error } = await supabase
      .from('likes')
      .select('*')
      .eq('item_id', itemId)
      .eq('item_type', itemType);
    
    return { data, error };
  },

  async checkUserLike(userId: string, itemId: string, itemType: 'project' | 'blog') {
    const { data, error } = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', userId)
      .eq('item_id', itemId)
      .eq('item_type', itemType)
      .maybeSingle();
    
    return { data, error };
  },

  async toggleLike(userId: string, itemId: string, itemType: 'project' | 'blog') {
    // Check if like exists
    const { data: existingLike } = await this.checkUserLike(userId, itemId, itemType);

    if (existingLike) {
      // Unlike
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);
      
      return { liked: false, error };
    } else {
      // Like
      const { error } = await supabase
        .from('likes')
        .insert({
          user_id: userId,
          item_id: itemId,
          item_type: itemType
        });
      
      return { liked: true, error };
    }
  },

  subscribeToLikes(itemId: string, itemType: 'project' | 'blog', callback: (payload: any) => void) {
    return supabase
      .channel(`likes:${itemType}:${itemId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'likes',
          filter: `item_id=eq.${itemId}`
        },
        callback
      )
      .subscribe();
  }
};