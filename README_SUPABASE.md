# Portfolio with Supabase Integration

This portfolio website now includes real-time interactive features powered by Supabase!

## Features

### 🔥 Live Interactive Features

- **View Counter**: Each project page automatically tracks and displays view count
- **Like Button**: Users can like projects (tracked via localStorage to prevent duplicate likes)
- **Comments Section**: Users can leave comments on projects with real-time updates
- **Real-time Updates**: New comments appear instantly using Supabase Realtime

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Create a new project
3. Wait for the database to initialize

### 2. Run Database Setup

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the SQL from `SUPABASE_SETUP.md`
3. Run the query to create tables and policies

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials:
   - Go to Project Settings > API
   - Copy your Project URL and anon/public key
   - Add them to `.env`:
     ```
     VITE_SUPABASE_URL=your_project_url
     VITE_SUPABASE_ANON_KEY=your_anon_key
     ```

### 4. Start Development Server

```bash
npm run dev
```

## Database Tables

### `comments`
Stores user comments for projects
- `id`: UUID (Primary Key)
- `project_slug`: Text (Project identifier)
- `name`: Text (Commenter's name)
- `email`: Text (Optional email)
- `message`: Text (Comment message)
- `created_at`: Timestamp
- `approved`: Boolean (For future moderation)

### `project_views`
Tracks view counts for projects
- `id`: UUID (Primary Key)
- `project_slug`: Text (Unique, Project identifier)
- `count`: Integer (View count)

### `project_likes`
Tracks like counts for projects
- `id`: UUID (Primary Key)
- `project_slug`: Text (Unique, Project identifier)
- `count`: Integer (Like count)

## Features Breakdown

### View Counter
- Automatically increments on each page load
- Uses upsert logic to create or update view count
- Displays with eye icon in stats card

### Like Button
- One like per user (tracked via localStorage)
- Animated heart icon
- Changes to "Liked" state after clicking
- Toast notification on success

### Comments System
- Real-time comment updates using Supabase Realtime
- Name and message required, email optional
- Newest comments displayed first
- User avatar with initials
- Timestamp formatting with date-fns
- Smooth entrance animations

## Toast Notifications

The app uses `sonner` for beautiful toast notifications:
- Success: When comment is posted or project is liked
- Error: When operations fail
- Info: When user tries to like again

## Tech Stack

- **Supabase**: Database, Auth (future), Realtime, Storage
- **React**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **Motion**: Animations
- **Sonner**: Toast notifications
- **date-fns**: Date formatting

## Security

Row Level Security (RLS) is enabled on all tables with policies that:
- Allow anyone to read approved comments
- Allow anyone to insert comments
- Allow anyone to view and update view/like counts

For production, you may want to add:
- Comment moderation workflow
- Rate limiting
- Spam protection
- User authentication

## Future Enhancements

- [ ] User authentication with Supabase Auth
- [ ] Comment moderation dashboard
- [ ] Reply to comments
- [ ] Like comments
- [ ] Share projects
- [ ] Email notifications for new comments
- [ ] Analytics dashboard

## Troubleshooting

### Comments not showing up?
- Check your Supabase project is running
- Verify environment variables are correct
- Check browser console for errors
- Ensure RLS policies are set correctly

### Real-time not working?
- Verify Realtime is enabled in Supabase
- Check that comments table is added to `supabase_realtime` publication
- Ensure your plan includes Realtime features

### Views/Likes not incrementing?
- Check Supabase dashboard for errors
- Verify table names match exactly
- Check RLS policies allow inserts/updates

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Review code in `/src/lib/supabaseClient.ts`
- Check component code in `/src/app/components/Project*.tsx`
