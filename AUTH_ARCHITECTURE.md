# Authentication System Architecture

## Overview

This portfolio website implements a complete authentication system using Supabase Auth with role-based access control (RBAC).

## Tech Stack

- **Authentication Provider**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Frontend**: React with TypeScript
- **State Management**: React Context API
- **Routing**: React Router v7
- **UI Components**: shadcn/ui with Tailwind CSS

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Side                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              AuthContext (Auth Provider)              │  │
│  │  - User state management                              │  │
│  │  - Session handling                                   │  │
│  │  - Auth methods (login, signup, logout)              │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                   │
│                           ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Protected Route                      │  │
│  │  - Route guards                                       │  │
│  │  - Role checking (admin, user)                       │  │
│  │  - Redirect logic                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Backend                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Supabase Auth                       │  │
│  │  - Email/Password authentication                      │  │
│  │  - OAuth (GitHub, Google)                            │  │
│  │  - Session management                                 │  │
│  │  - JWT token generation                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                   │
│                           ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               PostgreSQL Database                     │  │
│  │  ┌────────────────────────────────────┐             │  │
│  │  │  auth.users (Managed by Supabase)  │             │  │
│  │  └────────────────────────────────────┘             │  │
│  │  ┌────────────────────────────────────┐             │  │
│  │  │      public.profiles                │             │  │
│  │  │  - id (PK, FK to auth.users)       │             │  │
│  │  │  - email                            │             │  │
│  │  │  - role (admin | user)              │             │  │
│  │  │  - full_name                        │             │  │
│  │  │  - avatar_url                       │             │  │
│  │  │  - created_at                       │             │  │
│  │  │  - updated_at                       │             │  │
│  │  └────────────────────────────────────┘             │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                   │
│                           ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Row Level Security (RLS) Policies           │  │
│  │  - Users can read/update own profile                 │  │
│  │  - Admins can read all profiles                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
src/
├── lib/
│   └── supabase.ts              # Supabase client configuration
├── contexts/
│   └── AuthContext.tsx          # Auth context and provider
├── components/
│   └── ProtectedRoute.tsx       # Route guard component
└── app/
    ├── App.tsx                  # Main app with routing
    └── pages/
        ├── Login.tsx            # Login page
        ├── Register.tsx         # Registration page
        └── Admin.tsx            # Admin dashboard (protected)
```

## User Roles

### User (Default)
- Can access all public pages
- Can view their own profile
- Cannot access admin routes

### Admin
- All user permissions
- Can access `/admin` dashboard
- Can view all user profiles (with proper RLS policies)
- Can manage system settings

## Authentication Flow

### Registration Flow
1. User fills out registration form (`/register`)
2. Form validation (password match, length, etc.)
3. `signUp()` called with email, password, and full name
4. Supabase creates user in `auth.users`
5. Database trigger creates profile in `public.profiles` with role='user'
6. Email verification sent (if enabled)
7. User redirected to login page
8. Success message displayed

### Login Flow
1. User enters credentials at `/login`
2. `signIn()` called with email and password
3. Supabase validates credentials
4. JWT session token created
5. User state updated in AuthContext
6. Profile fetched from `public.profiles`
7. User redirected to intended page or home
8. Session persisted in localStorage

### OAuth Flow
1. User clicks OAuth provider button (GitHub/Google)
2. `signInWithOAuth()` called
3. User redirected to provider's auth page
4. User grants permissions
5. Provider redirects back to app with code
6. Supabase exchanges code for session
7. User profile created/updated
8. User redirected to app

### Logout Flow
1. User clicks logout button
2. `signOut()` called
3. Session cleared from Supabase
4. Local storage cleared
5. User state reset in AuthContext
6. User redirected to home page

### Protected Route Flow
1. User navigates to protected route
2. `ProtectedRoute` component checks auth state
3. If loading, show loading spinner
4. If not authenticated, redirect to `/login` with return URL
5. If authenticated but lacks required role, redirect to home
6. If authorized, render protected component

## API Methods

### AuthContext Methods

```typescript
// Sign in with email and password
const { error } = await signIn(email, password);

// Sign up new user
const { error } = await signUp(email, password, fullName);

// Sign out current user
await signOut();

// Sign in with OAuth provider
const { error } = await signInWithOAuth('github' | 'google');

// Check if user is admin
const isUserAdmin = isAdmin();

// Check if user has specific role
const hasUserRole = hasRole('admin' | 'user');
```

### AuthContext State

```typescript
{
  user: User | null;           // Supabase user object
  profile: Profile | null;      // User profile from database
  session: Session | null;      // Current session
  loading: boolean;             // Loading state
}
```

## Security Features

### Client-Side Security
- ✅ Environment variables for API keys
- ✅ Only `anon` key used on client (never `service_role`)
- ✅ Protected routes with auth guards
- ✅ Role-based access control
- ✅ Automatic session refresh
- ✅ Secure token storage (localStorage)

### Server-Side Security (Supabase)
- ✅ Row Level Security (RLS) policies
- ✅ JWT token validation
- ✅ Password hashing (bcrypt)
- ✅ Email verification (optional)
- ✅ Rate limiting
- ✅ HTTPS only

### Best Practices Implemented
- ✅ Centralized auth logic in context
- ✅ Proper error handling
- ✅ Loading states for async operations
- ✅ Redirect after login to intended destination
- ✅ User feedback (success/error messages)
- ✅ Secure password requirements

## Environment Variables

Required environment variables (never commit these!):

```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Testing Strategy

### Manual Testing Checklist
- [ ] User can register with email/password
- [ ] User receives verification email (if enabled)
- [ ] User can log in with valid credentials
- [ ] Invalid credentials show error message
- [ ] User can log out
- [ ] Protected routes redirect to login when not authenticated
- [ ] Admin routes are only accessible to admin users
- [ ] Session persists after page refresh
- [ ] OAuth login works for GitHub
- [ ] OAuth login works for Google

### Edge Cases to Test
- [ ] Expired session handling
- [ ] Network errors during auth
- [ ] Concurrent auth requests
- [ ] Browser back button after logout
- [ ] Multiple tabs with different auth states
- [ ] Password reset flow (if implemented)

## Future Enhancements

Potential improvements:
- [ ] Two-factor authentication (2FA)
- [ ] Password reset functionality
- [ ] Email verification flow
- [ ] Remember me functionality
- [ ] Session timeout warnings
- [ ] User profile editing
- [ ] Avatar upload
- [ ] Activity log
- [ ] Account deletion
- [ ] Social profile linking

## Performance Considerations

- Session data cached in memory (AuthContext)
- Profile data fetched once and cached
- Optimistic UI updates
- Lazy loading of protected routes
- Minimal re-renders with proper React optimization

## Common Issues and Solutions

### Issue: "Invalid API key"
**Solution**: Check `.env.local` file and restart dev server

### Issue: Profile not created on signup
**Solution**: Verify database trigger is working

### Issue: OAuth redirect fails
**Solution**: Check callback URL matches in OAuth provider settings

### Issue: Session not persisting
**Solution**: Check localStorage and session configuration

### Issue: Can't access admin page
**Solution**: Verify user role in database: `SELECT role FROM profiles WHERE email = 'your-email'`

## Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [React Context API](https://react.dev/reference/react/useContext)
- [React Router](https://reactrouter.com/)
- [JWT Introduction](https://jwt.io/introduction)
