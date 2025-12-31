# Supabase Database Setup

## Instructions

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to the SQL Editor
3. Run the following SQL queries to set up the database tables

## SQL Queries

```sql
-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  approved BOOLEAN DEFAULT true
);

-- Create project_views table
CREATE TABLE IF NOT EXISTS project_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_slug TEXT UNIQUE NOT NULL,
  count INTEGER DEFAULT 1
);

-- Create project_likes table
CREATE TABLE IF NOT EXISTS project_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_slug TEXT UNIQUE NOT NULL,
  count INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_comments_project_slug ON comments(project_slug);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_views_slug ON project_views(project_slug);
CREATE INDEX IF NOT EXISTS idx_project_likes_slug ON project_likes(project_slug);

-- Enable Row Level Security (RLS)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Enable insert access for all users" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON project_views
  FOR SELECT USING (true);

CREATE POLICY "Enable insert/update for all users" ON project_views
  FOR ALL USING (true);

CREATE POLICY "Enable read access for all users" ON project_likes
  FOR SELECT USING (true);

CREATE POLICY "Enable insert/update for all users" ON project_likes
  FOR ALL USING (true);

-- Enable Realtime for comments (optional, for real-time updates)
ALTER PUBLICATION supabase_realtime ADD TABLE comments;
```

## Environment Variables

After setting up the database, add your Supabase credentials to a `.env` file in the root of your project:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under Settings > API.
