/**
 * Like Button Component
 * 
 * Provides like functionality for projects and blog posts.
 * Uses mock data through the like service.
 * 
 * TODO: Backend Integration
 * - Replace mock service with real API calls
 * - Add real-time updates for like counts
 * - Implement optimistic updates
 * - Add animations for like interactions
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './ui/button';
import { Heart, Loader2 } from 'lucide-react';
import * as likeService from '../../services/like.service';
import { EntityType } from '../../types';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface LikeButtonProps {
  itemId: string;
  itemType: EntityType;
}

export function LikeButton({ itemId, itemType }: LikeButtonProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    loadLikes();
  }, [itemId, itemType, user]);

  const loadLikes = async () => {
    try {
      const { data, error } = await likeService.getLikeData(
        itemType,
        itemId,
        user?.id
      );

      if (error) throw error;

      setLikeCount(data.count);
      setLiked(data.hasLiked);
    } catch (error: any) {
      console.error('Error loading likes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLike = async () => {
    if (!user) {
      toast.error('Please log in to like');
      return;
    }

    setToggling(true);

    // Optimistic update
    const previousLiked = liked;
    const previousCount = likeCount;
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    try {
      const { data, error } = await likeService.toggleLike(itemType, itemId, user.id);

      if (error) throw error;

      // Update with actual values from server
      if (data) {
        setLiked(data.liked);
        setLikeCount(data.count);
      }
    } catch (error: any) {
      // Revert on error
      setLiked(previousLiked);
      setLikeCount(previousCount);
      console.error('Error toggling like:', error);
      toast.error(error.message || 'Failed to update like');
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <span>{likeCount}</span>
      </Button>
    );
  }

  return (
    <Button
      variant={liked ? 'default' : 'outline'}
      onClick={handleToggleLike}
      disabled={toggling}
      className="gap-2"
    >
      <motion.div
        animate={liked ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`h-4 w-4 ${liked ? 'fill-current' : ''}`}
        />
      </motion.div>
      <span>{likeCount}</span>
    </Button>
  );
}
