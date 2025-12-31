# Static Architecture Documentation

## Overview

This portfolio application is currently **100% static** with no real backend integration. All data is mocked locally, and all "backend" operations are simulated using client-side logic. However, the architecture is designed to be **backend-ready**, allowing for easy integration with a real API in the future.

---

## Core Principles

1. **No Real Backend**: All data is mocked using JSON/TypeScript files
2. **Service Layer Pattern**: All "API" calls go through service interfaces
3. **Type Safety**: Full TypeScript coverage for easy refactoring
4. **Separation of Concerns**: Clear boundaries between layers
5. **Backend-Ready**: Architecture designed for easy replacement

---

## Architecture Layers

### 1. Mocks Layer (`/src/mocks/`)

Contains all mock data and basic CRUD operations.

- **users.ts**: Mock user accounts with authentication data
- **projects.ts**: Mock project portfolio items
- **blogs.ts**: Mock blog posts with content
- **comments.ts**: Mock comments for projects and blogs
- **likes.ts**: Mock likes/reactions system

**Key Features:**
- In-memory data storage
- Basic query functions (get, filter, sort)
- Client-side validation
- Simulates database constraints

**Backend Migration Path:**
```
Remove entire /src/mocks/ directory when backend is ready
```

---

### 2. Services Layer (`/src/services/`)

Abstraction layer that handles all "backend" operations.

#### **auth.service.ts**
Handles authentication operations:
- `signIn(credentials)`: Email/password login
- `signUp(data)`: User registration
- `signOut()`: Logout and clear session
- `getSession()`: Get current session
- `getCurrentUser()`: Get current user
- `signInWithOAuth(provider)`: OAuth (mocked)

**Current Implementation:**
- Uses localStorage for session persistence
- Mock JWT tokens
- Plain text password validation (DEMO ONLY!)

**Backend Migration:**
```typescript
// Replace with
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/session
POST /api/auth/refresh
POST /api/auth/oauth/:provider
```

#### **user.service.ts**
User profile management:
- `getUsers()`: Get all users (admin)
- `getUserProfile(id)`: Get user by ID
- `updateProfile(id, data)`: Update user profile
- `uploadAvatar(id, file)`: Upload profile picture
- `checkUsernameAvailable(username)`: Check username availability
- `deleteUser(id)`: Delete user (admin)
- `updateUserRole(id, role)`: Change user role (admin)

**Backend Migration:**
```typescript
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
POST   /api/users/:id/avatar
GET    /api/users/username/:username/available
DELETE /api/users/:id
PATCH  /api/users/:id/role
```

#### **project.service.ts**
Project portfolio operations:
- `getProjects()`: Get all projects
- `getProject(slug)`: Get project by slug
- `getFeatured()`: Get featured projects
- `createProject(data)`: Create new project (admin)
- `updateProject(slug, data)`: Update project (admin)
- `deleteProject(slug)`: Delete project (admin)

**Backend Migration:**
```typescript
GET    /api/projects
GET    /api/projects/:slug
POST   /api/projects
PUT    /api/projects/:slug
DELETE /api/projects/:slug
```

#### **blog.service.ts**
Blog post operations:
- `getBlogs()`: Get all published blogs
- `getBlog(slug)`: Get blog by slug
- `createBlog(data)`: Create blog post (admin)
- `updateBlog(slug, data)`: Update blog post (admin)
- `deleteBlog(slug)`: Delete blog post (admin)

**Backend Migration:**
```typescript
GET    /api/blogs
GET    /api/blogs/:slug
POST   /api/blogs
PUT    /api/blogs/:slug
DELETE /api/blogs/:slug
```

#### **comment.service.ts**
Comment system:
- `getComments(entityType, entityId)`: Get comments
- `addComment(userId, entityType, entityId, content)`: Add comment
- `updateComment(id, content, userId)`: Edit comment
- `deleteComment(id, userId)`: Delete comment
- `getAllComments()`: Get all comments (admin)

**Backend Migration:**
```typescript
GET    /api/comments?entity_type=:type&entity_id=:id
POST   /api/comments
PUT    /api/comments/:id
DELETE /api/comments/:id
GET    /api/admin/comments
```

#### **like.service.ts**
Like/reaction system:
- `getLikeData(entityType, entityId, userId)`: Get like count and user status
- `toggleLike(entityType, entityId, userId)`: Toggle like
- `getUserLikes(userId)`: Get user's likes
- `getAllLikes()`: Get all likes (admin)

**Backend Migration:**
```typescript
GET  /api/likes?entity_type=:type&entity_id=:id
POST /api/likes
GET  /api/users/:userId/likes
GET  /api/admin/likes
```

---

### 3. Context Layer (`/src/contexts/`)

#### **AuthContext.tsx**
Provides global authentication state.

**Current Implementation:**
- Uses auth.service for operations
- Stores user in React state
- Initializes from localStorage

**Backend Migration:**
- Replace localStorage with secure HTTP-only cookies
- Add token refresh logic
- Implement proper session management

---

### 4. Components Layer (`/src/app/`)

All UI components consume data through services, never directly from mocks.

**Key Components:**
- `App.tsx`: Main app with routing
- `pages/`: All page components
- `components/`: Reusable UI components

**Migration Notes:**
- No changes needed if service interfaces remain consistent
- Add loading states
- Add error boundaries
- Handle real network latency

---

## Data Flow

```
┌─────────────┐
│  Component  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │  ← Service layer (abstraction)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Mock     │  ← Mock data (temporary)
│  Functions  │
└─────────────┘

Backend Integration:
┌─────────────┐
│   Service   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  HTTP/API   │  ← Real backend calls
│   Client    │
└─────────────┘
```

---

## Mock Data Structure

### Users
- **admin@example.com** / admin123 (Admin role)
- **john@example.com** / user123 (User role)
- **jane@example.com** / user123 (User role)

### Projects
- 6 sample projects with various categories
- E-commerce Platform (Featured)
- Task Management App (Featured)
- Weather Dashboard
- Social Media API (Featured)
- Portfolio Generator
- AI Chatbot Platform

### Blog Posts
- 4 sample blog posts
- React tutorial
- TypeScript best practices
- Tailwind CSS responsive design
- Node.js microservices

### Comments & Likes
- Pre-populated interactions on projects and blogs
- Client-side validation for duplicates
- User ownership tracking

---

## Authentication System

### Current (Mock) Implementation

**Session Storage:**
- `localStorage.setItem('mock_auth_session', JSON.stringify(session))`
- `localStorage.setItem('mock_auth_user', JSON.stringify(user))`

**Session Structure:**
```typescript
{
  user: User,
  token: string,  // Mock JWT (not real)
  expiresAt: string
}
```

**Security Notes:**
- ⚠️ Passwords stored in plain text (DEMO ONLY!)
- ⚠️ No real JWT validation
- ⚠️ Client-side role checking (not secure)
- ⚠️ No CSRF protection
- ⚠️ No rate limiting

### Backend Integration Checklist

**When integrating real backend:**

✅ Replace localStorage with HTTP-only cookies
✅ Implement proper password hashing (bcrypt/argon2)
✅ Use real JWT tokens with signatures
✅ Add token refresh mechanism
✅ Implement server-side role validation
✅ Add CSRF tokens
✅ Implement rate limiting
✅ Add session expiry and refresh
✅ Implement OAuth properly
✅ Add email verification
✅ Add password reset flow

---

## Protected Routes

**Current Implementation:**
```typescript
<ProtectedRoute requireAdmin>
  <AdminPage />
</ProtectedRoute>
```

**How it works:**
1. Checks user from AuthContext
2. Redirects to /login if not authenticated
3. Checks role for admin routes
4. Client-side only (not secure)

**Backend Integration:**
- Server-side route protection required
- API endpoints must validate tokens
- Implement proper authorization middleware

---

## File Upload System

### Current (Mock) Implementation

**Avatar Upload:**
- Creates local preview URL with `URL.createObjectURL(file)`
- Generates Dicebear avatar URL
- No real file storage

**Backend Integration:**
```typescript
// Replace with actual cloud storage
POST /api/upload/avatar
- Validate file type and size
- Upload to S3/Cloudinary/etc
- Return public URL
- Update user profile with URL
```

---

## Admin Panel

### Current Features (All Mocked)

**Dashboard:**
- User count
- Project count
- Blog count
- Comment count
- Recent activity

**Management:**
- User list with role updates
- Project CRUD
- Blog CRUD
- Comment moderation
- Like management

**Implementation:**
- All mutations update in-memory arrays
- No persistence between sessions
- Optimistic UI updates
- Success/error simulations

**Backend Integration:**
```typescript
GET    /api/admin/stats
GET    /api/admin/users
GET    /api/admin/projects
GET    /api/admin/blogs
GET    /api/admin/comments
GET    /api/admin/likes
GET    /api/admin/activity
```

---

## Type System

### Shared Types (`/src/types/index.ts`)

**Current:**
- Re-exports types from mocks
- Will be replaced with API-generated types

**Backend Integration Options:**

1. **OpenAPI/Swagger**
   ```bash
   npx openapi-typescript ./api-spec.yaml -o ./src/types/api.ts
   ```

2. **GraphQL Code Generator**
   ```bash
   npx graphql-code-generator --config codegen.yml
   ```

3. **Shared Types Package**
   ```typescript
   // @myapp/shared-types
   export * from './user.types';
   export * from './project.types';
   ```

---

## Network Simulation

All services include artificial delays to simulate network latency:

```typescript
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));
```

**Delays:**
- Standard operations: 500ms
- File uploads: 1000ms
- Quick checks: 300ms

**Backend Integration:**
- Remove all `delay()` calls
- Real network latency will apply
- Add proper loading states
- Add timeout handling

---

## Error Handling

### Current Implementation

**Error Structure:**
```typescript
{ data: null, error: { message: string } }
// or
{ success: false, error: { message: string } }
```

**Common Errors:**
- "User not found"
- "Email already registered"
- "Invalid credentials"
- "Unauthorized"
- "Not found"

### Backend Integration

**Standard HTTP Errors:**
```typescript
{
  status: number,
  message: string,
  errors?: ValidationError[]
}
```

**Error Codes:**
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Validation Error
- 500: Server Error

---

## State Management

### Current Approach

**Local State:**
- React useState for component state
- React Context for auth state

**Data Persistence:**
- localStorage for auth session
- In-memory for all other data
- No real persistence

### Backend Integration Options

**Option 1: React Query**
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: () => api.projects.getAll()
});
```

**Option 2: SWR**
```typescript
const { data, error, isLoading } = useSWR('/api/projects', fetcher);
```

**Option 3: Redux Toolkit Query**
```typescript
const { data, isLoading } = useGetProjectsQuery();
```

---

## Testing Strategy

### Current State
- No tests (static demo)

### Backend Integration Testing

**Unit Tests:**
- Service layer functions
- Mock API responses
- Type validation

**Integration Tests:**
- API endpoint testing
- Auth flow testing
- CRUD operations

**E2E Tests:**
- User registration flow
- Login/logout flow
- Admin operations
- Comment/like interactions

---

## Environment Variables

### Current (None Required)
- All configuration is hardcoded

### Backend Integration

**Required Variables:**
```bash
# API Configuration
VITE_API_URL=https://api.example.com
VITE_API_TIMEOUT=30000

# Authentication
VITE_JWT_EXPIRES_IN=24h

# OAuth (if used)
VITE_GITHUB_CLIENT_ID=xxx
VITE_GOOGLE_CLIENT_ID=xxx

# File Upload
VITE_UPLOAD_MAX_SIZE=5242880  # 5MB
VITE_UPLOAD_ALLOWED_TYPES=image/*

# Feature Flags
VITE_ENABLE_OAUTH=true
VITE_ENABLE_COMMENTS=true
VITE_ENABLE_LIKES=true
```

---

## Migration Checklist

### Phase 1: Setup
- [ ] Choose backend framework (Node.js, Python, etc.)
- [ ] Setup database (PostgreSQL, MongoDB, etc.)
- [ ] Setup authentication system
- [ ] Setup file storage (S3, Cloudinary, etc.)

### Phase 2: API Development
- [ ] Create API endpoints matching service signatures
- [ ] Implement authentication middleware
- [ ] Implement authorization checks
- [ ] Add input validation
- [ ] Add error handling
- [ ] Add rate limiting

### Phase 3: Frontend Integration
- [ ] Create API client (axios, fetch wrapper)
- [ ] Update service layer to use API client
- [ ] Remove mock data files
- [ ] Update type definitions
- [ ] Add proper error handling
- [ ] Add loading states

### Phase 4: Testing
- [ ] Test all endpoints
- [ ] Test authentication flows
- [ ] Test protected routes
- [ ] Test file uploads
- [ ] Load testing
- [ ] Security testing

### Phase 5: Deployment
- [ ] Setup CI/CD
- [ ] Configure environment variables
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Setup monitoring
- [ ] Setup error tracking

---

## Quick Start (Backend Integration)

### Step 1: Create API Client

```typescript
// /src/lib/api-client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  withCredentials: true,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Step 2: Update Auth Service

```typescript
// /src/services/auth.service.ts
import apiClient from '../lib/api-client';

export const signIn = async (credentials: LoginCredentials) => {
  try {
    const { data } = await apiClient.post('/auth/login', credentials);
    return { session: data, error: null };
  } catch (error: any) {
    return { session: null, error: { message: error.response?.data?.message || 'Login failed' } };
  }
};

// Update other methods similarly...
```

### Step 3: Update Other Services

Follow the same pattern for all services. Replace mock functions with API calls.

### Step 4: Remove Mocks

```bash
rm -rf /src/mocks
```

### Step 5: Update Types

Replace mock type re-exports with API-generated types.

---

## Current Demo Credentials

**Admin Account:**
- Email: admin@example.com
- Password: admin123

**User Accounts:**
- Email: john@example.com, Password: user123
- Email: jane@example.com, Password: user123

**Note:** These are hardcoded in `/src/mocks/users.ts`

---

## Known Limitations (Static Version)

1. **No Persistence**: All data resets on page refresh (except auth session)
2. **No Security**: Everything is client-side and can be manipulated
3. **No Validation**: Limited input validation
4. **No Rate Limiting**: Unlimited requests
5. **No Real-time**: No WebSocket/SSE for real-time updates
6. **No File Storage**: Avatar uploads don't persist
7. **No Email**: No email verification or notifications
8. **No Search**: Basic filtering only, no full-text search
9. **No Pagination**: All data loaded at once
10. **No Analytics**: No user tracking or analytics

---

## Future Enhancements (Requires Backend)

- [ ] Email verification
- [ ] Password reset
- [ ] Two-factor authentication
- [ ] OAuth with GitHub/Google
- [ ] Real-time notifications
- [ ] Search functionality
- [ ] Pagination
- [ [ ] Image optimization
- [ ] SEO meta tags (SSR)
- [ ] Analytics integration
- [ ] Content moderation
- [ ] Spam detection
- [ ] User blocking
- [ ] Report system
- [ ] Admin audit logs

---

## Support & Questions

This architecture document should provide all the information needed to:
1. Understand the current static implementation
2. Plan backend integration
3. Migrate to a real API
4. Extend functionality

For questions or clarifications, refer to the TODO comments in each service file.
