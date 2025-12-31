import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Separator } from '../components/ui/separator';
import { Loader2, Camera, Save, User as UserIcon, Mail, Calendar, Shield } from 'lucide-react';
import { profileService } from '../../lib/supabase';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    display_name: profile?.display_name || profile?.full_name || '',
    bio: profile?.bio || ''
  });

  const [errors, setErrors] = useState({
    username: '',
    display_name: '',
    bio: ''
  });

  // Show loading state while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to view your profile.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    setUploadingAvatar(true);
    try {
      const { data: avatarUrl, error } = await profileService.uploadAvatar(user.id, file);
      
      if (error) throw error;
      
      if (avatarUrl) {
        const { error: updateError } = await profileService.updateProfile(user.id, {
          avatar_url: avatarUrl
        });

        if (updateError) throw updateError;

        toast.success('Avatar updated successfully');
        // Refresh page to show new avatar
        window.location.reload();
      }
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error(error.message || 'Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const validateForm = async () => {
    const newErrors = {
      username: '',
      display_name: '',
      bio: ''
    };

    // Validate username
    if (formData.username) {
      if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        newErrors.username = 'Username can only contain letters, numbers, and underscores';
      } else if (formData.username !== profile?.username) {
        // Check if username is available
        const { available, error } = await profileService.checkUsernameAvailable(
          formData.username,
          user.id
        );
        if (error) {
          newErrors.username = 'Error checking username availability';
        } else if (!available) {
          newErrors.username = 'Username is already taken';
        }
      }
    }

    // Validate display name
    if (!formData.display_name) {
      newErrors.display_name = 'Display name is required';
    } else if (formData.display_name.length < 2) {
      newErrors.display_name = 'Display name must be at least 2 characters';
    }

    // Validate bio
    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) return;

    setLoading(true);
    try {
      const { error } = await profileService.updateProfile(user.id, formData);
      
      if (error) throw error;

      toast.success('Profile updated successfully');
      setIsEditing(false);
      // Refresh to show updated data
      window.location.reload();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: profile?.username || '',
      display_name: profile?.display_name || profile?.full_name || '',
      bio: profile?.bio || ''
    });
    setErrors({ username: '', display_name: '', bio: '' });
    setIsEditing(false);
  };

  const getInitials = () => {
    const name = profile.display_name || profile.full_name || profile.email;
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              My <span className="text-primary">Profile</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your profile information and settings
            </p>
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar 
                      className="h-32 w-32 cursor-pointer border-4 border-border"
                      onClick={handleAvatarClick}
                    >
                      <AvatarImage src={profile.avatar_url} alt={profile.display_name || 'User'} />
                      <AvatarFallback className="text-3xl">{getInitials()}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                        onClick={handleAvatarClick}
                      >
                        {uploadingAvatar ? (
                          <Loader2 className="h-8 w-8 text-white animate-spin" />
                        ) : (
                          <Camera className="h-8 w-8 text-white" />
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={!isEditing || uploadingAvatar}
                  />
                  {isEditing && (
                    <p className="text-sm text-muted-foreground">
                      Click avatar to upload new image (max 2MB)
                    </p>
                  )}
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid gap-6">
                  {/* Email (read-only) */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      value={profile.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      disabled={!isEditing || loading}
                      placeholder="Enter a unique username"
                    />
                    {errors.username && (
                      <p className="text-sm text-destructive">{errors.username}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Letters, numbers, and underscores only
                    </p>
                  </div>

                  {/* Display Name */}
                  <div className="space-y-2">
                    <Label htmlFor="display_name">Display Name *</Label>
                    <Input
                      id="display_name"
                      value={formData.display_name}
                      onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                      disabled={!isEditing || loading}
                      placeholder="How you want to be called"
                      required
                    />
                    {errors.display_name && (
                      <p className="text-sm text-destructive">{errors.display_name}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing || loading}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      maxLength={500}
                    />
                    {errors.bio && (
                      <p className="text-sm text-destructive">{errors.bio}</p>
                    )}
                    <p className="text-xs text-muted-foreground text-right">
                      {formData.bio.length}/500 characters
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Account Info (read-only) */}
                <div className="grid gap-4 bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold">Account Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Role:</span>
                      <span className="font-medium capitalize">{profile.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Member since:</span>
                      <span className="font-medium">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}