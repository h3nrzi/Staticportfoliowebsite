# User Profile & Social Interaction Features

This document describes the user profile and social interaction features implemented in the portfolio website.

## 🎯 Features Overview

### 1. User Profile Management

**Location**: `/profile` (requires authentication)

**Features**:
- ✅ View and edit user profile information
- ✅ Unique username with availability checking
- ✅ Display name customization
- ✅ Bio/about section (max 500 characters)
- ✅ Avatar upload to Supabase Storage (max 2MB)
- ✅ Real-time avatar preview
- ✅ Form validation with helpful error messages
- ✅ Read-only account information (email, role, join date)

**Profile Fields**:
- `username` - Unique username (letters, numbers, underscores only)
- `display_name` - How the user wants to be called (required)
- `bio` - Short description about the user
- `avatar_url` - Profile picture URL from Supabase Storage

### 2. Project Interactions

**Location**: `/projects/:slug`

**Features**:
- ✅ **Like Button**: 
  - Click to like/unlike a project
  - Shows total like count
  - Visual feedback with heart animation
  - Prevents duplicate likes per user
  - Real-time updates across all clients

- ✅ **Comments Section**:
  - Post comments (authenticated users only)
  - View all comments with author information
  - Edit your own comments
  - Delete your own comments
  - Real-time updates for new/edited/deleted comments
  - Formatted timestamps (e.g., "2 hours ago")
  - Shows "(edited)" indicator for modified comments

### 3. Blog Post Interactions

**Location**: `/blog/:slug`

**Features**:
- ✅ **Like Button**: Same functionality as projects
- ✅ **Comments Section**: Same functionality as projects
- ✅ Full blog post detail page with:
  - Cover image
  - Author and publication date
  - Read time estimate
  - Tags
  - Full content display

### 4. Real-time Updates

**Technology**: Supabase Realtime

**Real-time Features**:
- Comments automatically appear for all users viewing the same content
- Like counts update instantly across all sessions
- No page refresh needed

## 🔒 Security & Permissions

### Authentication Requirements

- **View Content**: Anyone can view projects, blog posts, and their likes/comments
- **Post Comments/Likes**: Requires authentication
- **Edit Comments**: Only the comment author can edit their own comments
- **Delete Comments**: Only the comment author can delete their own comments
- **Profile Access**: Only authenticated users can access `/profile`

### Row Level Security (RLS)

All database operations are protected by Supabase RLS policies:

**Comments**:
- `SELECT`: Public (anyone can read)
- `INSERT`: Authenticated users only, must match their user_id
- `UPDATE`: Only comment owner
- `DELETE`: Only comment owner

**Likes**:
- `SELECT`: Public (anyone can read)
- `INSERT`: Authenticated users only, must match their user_id
- `DELETE`: Only like owner
- Unique constraint prevents duplicate likes

**Profiles**:
- `SELECT`: Public (for displaying user info in comments)
- `UPDATE`: Only profile owner

**Storage (Avatars)**:
- `SELECT`: Public (anyone can view avatars)
- `INSERT/UPDATE/DELETE`: Only avatar owner

## 📋 Usage Guide

### For Users

**1. Create Profile**:
```
1. Register/Login to the site
2. Click "Profile" in navigation
3. Fill in your username, display name, and bio
4. Click on avatar to upload profile picture
5. Click "Save Changes"
```

**2. Comment on Projects/Blog**:
```
1. Navigate to any project or blog post
2. Scroll to comments section
3. Type your comment
4. Click "Post Comment"
```

**3. Edit Your Comment**:
```
1. Find your comment
2. Click the edit icon
3. Modify the text
4. Click "Save"
```

**4. Like Content**:
```
1. Navigate to any project or blog post
2. Click the "Like" button
3. Click again to unlike
```

### For Developers

**Profile Service** (`src/lib/supabase.ts`):
```typescript
import { profileService } from '../lib/supabase';

// Get profile
const { data, error } = await profileService.getProfile(userId);

// Update profile
const { data, error } = await profileService.updateProfile(userId, {
  username: 'johndoe',
  display_name: 'John Doe',
  bio: 'Software developer'
});

// Upload avatar
const { data: avatarUrl, error } = await profileService.uploadAvatar(userId, file);

// Check username availability
const { available, error } = await profileService.checkUsernameAvailable('johndoe');
```

**Comment Service** (`src/lib/supabase.ts`):
```typescript
import { commentService } from '../lib/supabase';

// Get comments for an item
const { data, error } = await commentService.getComments(itemId, 'project');

// Add comment
const { data, error } = await commentService.addComment(
  userId, 
  itemId, 
  'project', 
  'Great project!'
);

// Update comment
const { data, error } = await commentService.updateComment(commentId, 'Updated text');

// Delete comment
const { error } = await commentService.deleteComment(commentId);

// Subscribe to real-time updates
const channel = commentService.subscribeToComments(itemId, 'project', (payload) => {
  console.log('Comment update:', payload);
});
```

**Like Service** (`src/lib/supabase.ts`):
```typescript
import { likeService } from '../lib/supabase';

// Get all likes for an item
const { data, error } = await likeService.getLikes(itemId, 'project');

// Check if user liked an item
const { data, error } = await likeService.checkUserLike(userId, itemId, 'project');

// Toggle like (like if not liked, unlike if liked)
const { liked, error } = await likeService.toggleLike(userId, itemId, 'project');

// Subscribe to real-time updates
const channel = likeService.subscribeToLikes(itemId, 'project', (payload) => {
  console.log('Like update:', payload);
});
```

## 🧩 Components

### CommentSection
**Location**: `src/app/components/CommentSection.tsx`

**Props**:
- `itemId: string` - ID of the project or blog post
- `itemType: 'project' | 'blog'` - Type of content

**Usage**:
```tsx
<CommentSection itemId={project.id} itemType="project" />
```

### LikeButton
**Location**: `src/app/components/LikeButton.tsx`

**Props**:
- `itemId: string` - ID of the project or blog post
- `itemType: 'project' | 'blog'` - Type of content

**Usage**:
```tsx
<LikeButton itemId={project.id} itemType="project" />
```

## 🎨 UI/UX Features

### Profile Page
- Clean, card-based layout
- Large avatar with hover effect for uploading
- Inline validation messages
- Loading states for all async operations
- Read-only sections for immutable data
- Responsive design for mobile

### Comment Section
- Nested avatar + comment layout
- Smooth animations for new comments
- Edit mode with inline textarea
- Confirmation dialog for deletions
- Optimistic UI updates
- Real-time subscription indicators

### Like Button
- Heart icon animation on click
- Shows count when > 0
- Different styles for liked/unliked state
- Prevents multiple clicks during processing
- Works for both authenticated and non-authenticated users

## 🚀 Performance

- **Optimistic Updates**: UI updates immediately before server confirmation
- **Real-time Subscriptions**: Efficient WebSocket connections
- **Indexed Queries**: Database indexes on frequently queried fields
- **Image Optimization**: Avatar upload size validation
- **Lazy Loading**: Components load data only when needed

## 🐛 Error Handling

- Graceful degradation when Supabase is not configured
- User-friendly error messages via toast notifications
- Automatic retry on network failures
- Form validation prevents invalid submissions
- Storage quota error handling

## 📱 Responsive Design

All features are fully responsive:
- Mobile-friendly forms
- Touch-optimized buttons
- Responsive avatar sizes
- Adaptive comment layouts
- Mobile navigation support

## 🔮 Future Enhancements

Potential improvements:
- [ ] Comment threading (replies to comments)
- [ ] Mention system (@username)
- [ ] Comment reactions (emoji reactions)
- [ ] User profile pages (public view)
- [ ] Activity feed
- [ ] Notification system
- [ ] Report inappropriate content
- [ ] Comment moderation tools for admins
- [ ] Rich text editor for comments
- [ ] Image attachments in comments

## 📞 Support

For issues or questions:
1. Check `DATABASE_SETUP.md` for database configuration
2. Review `SUPABASE_SETUP.md` for Supabase setup
3. Check browser console for error messages
4. Verify Supabase credentials in `.env.local`
