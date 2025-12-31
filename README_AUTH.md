# Portfolio Website with Supabase Authentication

A complete, modern portfolio website built with React, TypeScript, Tailwind CSS, and Supabase authentication.

## 🔐 Authentication Features

### Implemented Features
- ✅ **Email/Password Authentication** - Secure user registration and login
- ✅ **OAuth Support** - GitHub and Google OAuth integration (ready to configure)
- ✅ **Role-Based Access Control** - Admin and user roles
- ✅ **Protected Routes** - Automatic route protection with auth guards
- ✅ **Session Management** - Persistent sessions with automatic refresh
- ✅ **Secure Configuration** - Environment-based API key management

### User Roles
- **User** (default): Access to all public pages and own profile
- **Admin**: Full access including admin dashboard at `/admin`

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase
Follow the comprehensive guide in `SUPABASE_SETUP.md`:
1. Create a Supabase project
2. Get your API keys
3. Create database tables and policies
4. Configure authentication providers (optional)
5. Create your first admin user

### 3. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Test Authentication
1. Visit `http://localhost:5173/register` to create an account
2. Log in at `http://localhost:5173/login`
3. Make yourself an admin in Supabase to access `/admin`

## 📁 Project Structure

### Authentication Files
```
src/
├── lib/
│   └── supabase.ts              # Supabase client and types
├── contexts/
│   └── AuthContext.tsx          # Auth state management
├── components/
│   └── ProtectedRoute.tsx       # Route guard component
└── app/
    └── pages/
        ├── Login.tsx            # Login page
        ├── Register.tsx         # Registration page
        └── Admin.tsx            # Protected admin dashboard
```

### Key Components

#### Supabase Client (`/src/lib/supabase.ts`)
- Centralized Supabase configuration
- Type definitions for user roles and profiles
- Environment-based configuration

#### Auth Context (`/src/contexts/AuthContext.tsx`)
- User state management
- Authentication methods (sign in, sign up, sign out)
- OAuth integration
- Role checking utilities

#### Protected Route (`/src/components/ProtectedRoute.tsx`)
- Route-level authentication guard
- Role-based access control
- Automatic redirects

## 🔑 Authentication Methods

### Sign Up
```typescript
const { error } = await signUp(email, password, fullName);
```

### Sign In
```typescript
const { error } = await signIn(email, password);
```

### Sign In with OAuth
```typescript
const { error } = await signInWithOAuth('github' | 'google');
```

### Sign Out
```typescript
await signOut();
```

### Check User Role
```typescript
const userIsAdmin = isAdmin();
const hasUserRole = hasRole('admin');
```

## 🛣️ Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/projects` - Projects gallery
- `/skills` - Skills showcase
- `/resume` - Resume/CV
- `/contact` - Contact form
- `/blog` - Blog posts

### Auth Routes
- `/login` - Login page
- `/register` - Registration page

### Protected Routes
- `/admin` - Admin dashboard (requires admin role)

## 🔒 Security Features

### Client-Side
- Environment variables for API keys
- Protected routes with auth guards
- Role-based access control
- Secure token storage
- Automatic session refresh

### Server-Side (Supabase)
- Row Level Security (RLS) policies
- JWT token validation
- Password hashing (bcrypt)
- Email verification (optional)
- Rate limiting

## 📚 Documentation

- **`SUPABASE_SETUP.md`** - Complete setup guide for Supabase
- **`AUTH_ARCHITECTURE.md`** - Technical architecture documentation
- **`.env.example`** - Environment variables template

## 🎨 UI/UX Features

### Login/Register Pages
- Clean, modern design with dark mode
- Email/password authentication
- OAuth buttons for GitHub and Google
- Form validation with error messages
- Loading states
- Success confirmations
- Mobile-responsive

### Admin Dashboard
- Stats overview cards
- Recent activity feed
- Quick action buttons
- User information display
- Role badge display
- Sign out functionality

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Motion** - Animations
- **React Router v7** - Routing

### Backend
- **Supabase** - Backend as a Service
  - Authentication
  - PostgreSQL database
  - Row Level Security
  - Real-time subscriptions

## 🧪 Testing the Auth System

### Manual Testing Checklist
1. ✅ Register a new user
2. ✅ Verify email is sent (if enabled)
3. ✅ Log in with correct credentials
4. ✅ Try login with wrong credentials
5. ✅ Access protected route without auth (should redirect)
6. ✅ Log out
7. ✅ Session persists after page refresh
8. ✅ Admin role restrictions work
9. ✅ OAuth login (if configured)

## 🐛 Troubleshooting

### Common Issues

#### "Invalid API key" error
- Check your `.env.local` file
- Ensure variables start with `VITE_`
- Restart the development server

#### Can't access admin page
- Verify your role in Supabase:
  ```sql
  UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
  ```

#### OAuth not working
- Check callback URL in OAuth provider settings
- Ensure provider is enabled in Supabase

#### Profile not created on signup
- Verify the database trigger is working
- Check Supabase logs for errors

## 📖 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## 🔐 Security Best Practices

### DO ✅
- Use environment variables for API keys
- Enable Row Level Security (RLS)
- Use the `anon` key on client side only
- Implement proper error handling
- Enable email verification
- Use HTTPS in production
- Keep dependencies updated

### DON'T ❌
- Commit `.env.local` to version control
- Use `service_role` key on client side
- Store sensitive data in localStorage without encryption
- Disable RLS policies
- Ignore security warnings

## 🎯 Next Steps

### Recommended Enhancements
1. Implement password reset functionality
2. Add two-factor authentication (2FA)
3. Create user profile editing page
4. Add avatar upload functionality
5. Implement email verification flow
6. Add remember me functionality
7. Create activity/audit log
8. Add session timeout warnings

## 📝 License

This project is part of a portfolio website. Customize as needed for your use case.

## 🤝 Support

For issues related to:
- **Supabase**: Check [Supabase Discord](https://discord.supabase.com)
- **Authentication**: Review `SUPABASE_SETUP.md`
- **Architecture**: See `AUTH_ARCHITECTURE.md`
