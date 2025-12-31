import React, { useState, useEffect } from 'react';
import { supabase, Comment, isSupabaseConfigured } from '../../lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectCommentsProps {
  projectSlug: string;
}

export default function ProjectComments({ projectSlug }: ProjectCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Comments Feature Not Configured</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                To enable comments, please set up Supabase. 
                Check the <code className="px-2 py-1 bg-muted rounded">README_SUPABASE.md</code> file for instructions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fetch comments
  useEffect(() => {
    if (!supabase) return;
    
    fetchComments();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel(`comments:${projectSlug}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `project_slug=eq.${projectSlug}`,
        },
        (payload) => {
          const newComment = payload.new as Comment;
          if (newComment.approved) {
            setComments((prev) => [newComment, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectSlug]);

  const fetchComments = async () => {
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('project_slug', projectSlug)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabase) {
      toast.error('Supabase is not configured');
      return;
    }
    
    if (!name.trim() || !message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          project_slug: projectSlug,
          name: name.trim(),
          email: email.trim() || null,
          message: message.trim(),
          approved: true,
        });

      if (error) throw error;

      toast.success('Comment posted successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-8">
      {/* Comments Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Leave a Comment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? (
                'Posting...'
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Post Comment
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">
          Comments ({comments.length})
        </h3>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </CardContent>
          </Card>
        ) : (
          <AnimatePresence mode="popLayout">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(comment.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{comment.name}</h4>
                          <time className="text-sm text-muted-foreground">
                            {format(new Date(comment.created_at), 'MMM dd, yyyy')}
                          </time>
                        </div>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}