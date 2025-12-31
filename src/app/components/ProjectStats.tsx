import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Eye, Heart, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface ProjectStatsProps {
  projectSlug: string;
}

export default function ProjectStats({ projectSlug }: ProjectStatsProps) {
  const [views, setViews] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center space-y-2">
            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Stats Feature Not Configured</p>
              <p className="text-xs text-muted-foreground">
                Set up Supabase to enable view and like tracking.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  useEffect(() => {
    initializeStats();
  }, [projectSlug]);

  const initializeStats = async () => {
    if (!supabase) return;
    
    try {
      // Fetch and increment views
      await incrementViews();
      
      // Fetch likes
      await fetchLikes();

      // Check if user has liked (stored in localStorage)
      const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
      setLiked(likedProjects.includes(projectSlug));
    } catch (error) {
      console.error('Error initializing stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async () => {
    if (!supabase) return;
    
    try {
      // Check if view record exists
      const { data: existingView, error: fetchError } = await supabase
        .from('project_views')
        .select('*')
        .eq('project_slug', projectSlug)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingView) {
        // Update existing view count
        const { data, error } = await supabase
          .from('project_views')
          .update({ count: existingView.count + 1 })
          .eq('project_slug', projectSlug)
          .select()
          .single();

        if (error) throw error;
        setViews(data.count);
      } else {
        // Insert new view record
        const { data, error } = await supabase
          .from('project_views')
          .insert({ project_slug: projectSlug, count: 1 })
          .select()
          .single();

        if (error) throw error;
        setViews(data.count);
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const fetchLikes = async () => {
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('project_likes')
        .select('*')
        .eq('project_slug', projectSlug)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setLikes(data?.count || 0);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async () => {
    if (!supabase) {
      toast.error('Supabase is not configured');
      return;
    }
    
    if (liked) {
      toast.info('You already liked this project!');
      return;
    }

    try {
      // Check if like record exists
      const { data: existingLike, error: fetchError } = await supabase
        .from('project_likes')
        .select('*')
        .eq('project_slug', projectSlug)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      let newCount = 1;
      if (existingLike) {
        // Update existing like count
        newCount = existingLike.count + 1;
        const { data, error } = await supabase
          .from('project_likes')
          .update({ count: newCount })
          .eq('project_slug', projectSlug)
          .select()
          .single();

        if (error) throw error;
      } else {
        // Insert new like record
        const { data, error } = await supabase
          .from('project_likes')
          .insert({ project_slug: projectSlug, count: 1 })
          .select()
          .single();

        if (error) throw error;
      }

      setLikes(newCount);
      setLiked(true);

      // Store in localStorage
      const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
      likedProjects.push(projectSlug);
      localStorage.setItem('likedProjects', JSON.stringify(likedProjects));

      toast.success('Thanks for liking this project!');
    } catch (error) {
      console.error('Error liking project:', error);
      toast.error('Failed to like project. Please try again.');
    }
  };

  if (loading) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="flex gap-4"
    >
      <Card className="flex-1">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Views</p>
              <p className="text-2xl font-bold">{views.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Heart className={`h-5 w-5 ${liked ? 'fill-primary' : ''} text-primary`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Likes</p>
                <p className="text-2xl font-bold">{likes.toLocaleString()}</p>
              </div>
            </div>
            <Button
              onClick={handleLike}
              disabled={liked}
              variant={liked ? 'secondary' : 'default'}
              size="sm"
            >
              <Heart className={`mr-2 h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              {liked ? 'Liked' : 'Like'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}