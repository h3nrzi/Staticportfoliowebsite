import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { likeService } from '../../lib/supabase';
import { toast } from 'sonner';

interface LikeButtonProps {
  itemId: string;
  itemType: 'project' | 'blog';
}

export function LikeButton({ itemId, itemType }: LikeButtonProps) {
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLikes();
    
    // Subscribe to real-time updates
    const channel = likeService.subscribeToLikes(itemId, itemType, () => {
      loadLikes();
    });

    return () => {
      channel.unsubscribe();
    };
  }, [itemId, itemType, user]);

  const loadLikes = async () => {
    try {
      // Get total likes
      const { data: likes, error: likesError } = await likeService.getLikes(itemId, itemType);
      if (likesError) throw likesError;
      setLikeCount(likes?.length || 0);

      // Check if current user has liked
      if (user) {
        const { data: userLike, error: userLikeError } = await likeService.checkUserLike(
          user.id,
          itemId,
          itemType
        );
        if (userLikeError) throw userLikeError;
        setIsLiked(!!userLike);
      } else {
        setIsLiked(false);
      }
    } catch (error: any) {
      console.error('Error loading likes:', error);
    }
  };

  const handleToggleLike = async () => {
    if (!user) {
      toast.error('Please log in to like');
      return;
    }

    setLoading(true);
    try {
      const { liked, error } = await likeService.toggleLike(user.id, itemId, itemType);
      if (error) throw error;

      // Optimistic update
      setIsLiked(liked);
      setLikeCount(prev => liked ? prev + 1 : prev - 1);

      toast.success(liked ? 'Liked!' : 'Unliked');
    } catch (error: any) {
      console.error('Error toggling like:', error);
      toast.error(error.message || 'Failed to update like');
      // Reload to ensure correct state
      await loadLikes();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isLiked ? 'default' : 'outline'}
      size="lg"
      onClick={handleToggleLike}
      disabled={loading}
      className="group"
    >
      <motion.div
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        className="mr-2"
      >
        <Heart 
          className={`h-5 w-5 transition-all ${
            isLiked 
              ? 'fill-current text-red-500' 
              : 'group-hover:text-red-500'
          }`}
        />
      </motion.div>
      <span>
        {isLiked ? 'Liked' : 'Like'} {likeCount > 0 && `(${likeCount})`}
      </span>
    </Button>
  );
}
