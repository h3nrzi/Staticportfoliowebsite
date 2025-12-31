# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for your portfolio website.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js installed on your machine

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in the project details:
   - **Name**: Your project name
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be provisioned (1-2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (under Project URL)
   - **anon public** key (under Project API keys)
3. Create a `.env.local` file in the root of your project
4. Add your keys:

```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit `.env.local` to version control. It should be in your `.gitignore`.

## Step 3: Create Database Tables

Run these SQL commands in the Supabase SQL Editor (Database > SQL Editor):

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    'user' -- Default role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamp
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Step 4: Configure Authentication Providers

### Email Authentication (Already Enabled)

Email authentication is enabled by default. Users can sign up with email/password.

### OAuth Providers (Optional)

#### GitHub OAuth

1. Go to **Authentication** > **Providers** in Supabase
2. Enable **GitHub**
3. Create a GitHub OAuth App:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in:
     - **Application name**: Your app name
     - **Homepage URL**: Your website URL
     - **Authorization callback URL**: Copy from Supabase (it looks like: `https://your-project.supabase.co/auth/v1/callback`)
4. Copy the Client ID and Client Secret from GitHub
5. Paste them in the Supabase GitHub provider settings
6. Click "Save"

#### Google OAuth

1. Go to **Authentication** > **Providers** in Supabase
2. Enable **Google**
3. Create a Google OAuth Client:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable "Google+ API"
   - Go to "Credentials" > "Create Credentials" > "OAuth client ID"
   - Application type: "Web application"
   - Authorized redirect URIs: Copy from Supabase (looks like: `https://your-project.supabase.co/auth/v1/callback`)
4. Copy the Client ID and Client Secret
5. Paste them in the Supabase Google provider settings
6. Click "Save"

## Step 5: Create Your First Admin User

After setting up authentication:

1. Register a new user through your app's `/register` page
2. Go to **Authentication** > **Users** in Supabase
3. Find your user
4. Run this SQL command to make them an admin:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

## Step 6: Security Considerations

### Environment Variables

- ✅ **DO**: Use `.env.local` for local development
- ✅ **DO**: Use environment variables in your hosting platform (Vercel, Netlify, etc.)
- ❌ **DON'T**: Commit `.env.local` or any file with real API keys to git
- ❌ **DON'T**: Use the `service_role` key on the client side (only use `anon` key)

### Row Level Security (RLS)

We've enabled RLS on the profiles table. This ensures users can only access their own data unless they're an admin.

### Additional Security

Consider adding:
- Email verification (enable in Supabase Auth settings)
- Password strength requirements
- Rate limiting
- Two-factor authentication (Supabase has built-in support)

## Step 7: Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the authentication flow:
   - Register a new account at `/register`
   - Check your email for verification (if enabled)
   - Log in at `/login`
   - Try accessing `/admin` (should fail unless you're an admin)
   - Make yourself an admin using the SQL command above
   - Try accessing `/admin` again (should work now)

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file
- Make sure the keys start with `VITE_`
- Restart your development server after changing env variables

### OAuth redirect not working
- Check that your callback URL in the OAuth provider matches exactly with Supabase
- Make sure the provider is enabled in Supabase
- Check browser console for errors

### Profile not created on signup
- Check that the trigger is working by running:
  ```sql
  SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
  ```
- Check Supabase logs for errors

### Can't access admin route
- Make sure your user's role is set to 'admin' in the profiles table
- Check browser console for auth errors
- Clear browser storage and try logging in again

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## Support

If you encounter issues:
1. Check the [Supabase Discord](https://discord.supabase.com)
2. Review [Supabase GitHub Issues](https://github.com/supabase/supabase/issues)
3. Check the browser console for error messages
