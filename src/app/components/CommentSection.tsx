/**
 * Comment Section Component
 * 
 * Displays and manages comments for projects and blog posts.
 * Uses mock data through the comment service.
 * 
 * TODO: Backend Integration
 * - Replace mock service with real API calls
 * - Add real-time updates using WebSockets/SSE
 * - Implement comment reactions
 * - Add comment threading/replies
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { MessageSquare, Loader2, Edit2, Trash2, Send } from 'lucide-react';
import * as commentService from '../../services/comment.service';
import * as userService from '../../services/user.service';
import { Comment, EntityType, User } from '../../types';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface CommentWithUser extends Comment {
  user?: User;
}

interface CommentSectionProps {
  itemId: string;
  itemType: EntityType;
}

export function CommentSection({ itemId, itemType }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    loadComments();
  }, [itemId, itemType]);

  const loadComments = async () => {
    try {
      const { data, error } = await commentService.getComments(itemType, itemId);
      if (error) throw error;

      // Load user data for each comment
      const commentsWithUsers = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: userData } = await userService.getUserProfile(comment.user_id);
          return { ...comment, user: userData || undefined };
        })
      );

      setComments(commentsWithUsers);
    } catch (error: any) {
      console.error('Error loading comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await commentService.addComment(
        user.id,
        itemType,
        itemId,
        newComment.trim()
      );

      if (error) throw error;

      setNewComment('');
      toast.success('Comment posted successfully');
      await loadComments();
    } catch (error: any) {
      console.error('Error posting comment:', error);
      toast.error(error.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (commentId: string) => {
    if (!editContent.trim() || !user) return;

    try {
      const { error } = await commentService.updateComment(commentId, editContent.trim(), user.id);
      if (error) throw error;

      setEditingId(null);
      setEditContent('');
      toast.success('Comment updated successfully');
      await loadComments();
    } catch (error: any) {
      console.error('Error updating comment:', error);
      toast.error(error.message || 'Failed to update comment');
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const { error } = await commentService.deleteComment(commentId, user.id);
      if (error) throw error;

      toast.success('Comment deleted successfully');
      await loadComments();
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      toast.error(error.message || 'Failed to delete comment');
    }
  };

  const startEdit = (comment: CommentWithUser) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submitting}
              rows={3}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={submitting || !newComment.trim()}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Post Comment
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Please <a href="/login" className="text-primary hover:underline">log in</a> to comment
          </div>
        )}

        <Separator />

        {/* Comments List */}
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-20" />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-4"
                >
                  <Avatar>
                    <AvatarImage src={comment.user?.avatar_url || undefined} />
                    <AvatarFallback>
                      {comment.user ? getInitials(comment.user.display_name || comment.user.full_name || comment.user.email) : '?'}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">
                          {comment.user?.display_name || comment.user?.full_name || 'Unknown User'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                          {comment.updated_at !== comment.created_at && ' (edited)'}
                        </p>
                      </div>

                      {user && (user.id === comment.user_id || user.role === 'admin') && (
                        <div className="flex gap-2">
                          {user.id === comment.user_id && editingId !== comment.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEdit(comment)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(comment.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingId === comment.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleEdit(comment.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
