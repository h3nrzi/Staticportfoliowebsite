# Static Portfolio Website - README

## 🎯 Overview

This is a **fully static** modern portfolio website built with React, TypeScript, and Tailwind CSS. All data is mocked locally with **no backend dependencies**, but the architecture is designed to be **easily migrated** to a real backend when needed.

---

## ✨ Features

### 📱 Pages
- **Home**: Hero section with featured projects
- **About**: Personal information and background  
- **Projects**: Portfolio with filtering and search
- **Skills**: Technical skills showcase
- **Resume**: Professional experience
- **Contact**: Contact form (UI only)
- **Blog**: Blog posts with content
- **Login/Register**: Authentication UI
- **Profile**: User profile management
- **Admin**: Admin dashboard (admin-only)
- **404**: Custom not found page

### 🔐 Authentication (Mocked)
- Email/password login
- User registration
- OAuth UI (GitHub, Google)
- Role-based access (admin/user)
- Protected routes
- Session persistence (localStorage)

### 💬 Social Features (Mocked)
- Project comments
- Blog post comments
- Like system for projects and blogs
- User profiles with avatars
- Comment editing and deletion
- Real-time-style updates (simulated)

### 🎨 UI/UX
- Dark mode by default
- Fully responsive design
- Smooth animations (Motion/React)
- Loading states
- Error handling
- Toast notifications
- Modern shadcn/ui components

---

## 🚀 Getting Started

### Demo Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**User Accounts:**
- Email: `john@example.com`, Password: `user123`
- Email: `jane@example.com`, Password: `user123`

### Running the App

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
/src
├── /app                    # React components & pages
│   ├── /components         # Reusable UI components
│   ├── /pages              # Page components
│   └── App.tsx             # Main app component
├── /contexts               # React contexts (Auth, etc.)
├── /mocks                  # Mock data (users, projects, blogs, etc.)
├── /services               # Service layer (API abstraction)
├── /types                  # TypeScript type definitions
├── /lib                    # Utility functions
└── /styles                 # Global styles & themes
```

---

## 🏗️ Architecture

### Layer Separation

**1. Mocks Layer** (`/src/mocks/`)
- In-memory data storage
- CRUD operations
- Simulates database

**2. Services Layer** (`/src/services/`)
- API abstraction
- Business logic
- Error handling
- Network simulation

**3. Context Layer** (`/src/contexts/`)
- Global state management
- Auth state
- Session management

**4. Components Layer** (`/src/app/`)
- UI components
- Pages
- User interactions

### Data Flow

```
Component → Service → Mock Data
```

**Backend Migration:**
```
Component → Service → HTTP Client → Real API
```

---

## 🔧 Services

### Authentication Service
- `signIn(email, password)` - Login
- `signUp(email, password, fullName)` - Register
- `signOut()` - Logout
- `getSession()` - Get current session
- `signInWithOAuth(provider)` - OAuth (mocked)

### User Service
- `getUsers()` - Get all users
- `getUserProfile(id)` - Get user by ID
- `updateProfile(id, data)` - Update profile
- `uploadAvatar(id, file)` - Upload avatar
- `checkUsernameAvailable(username)` - Check availability

### Project Service
- `getProjects()` - Get all projects
- `getProject(slug)` - Get project by slug
- `createProject(data)` - Create project (admin)
- `updateProject(slug, data)` - Update project (admin)
- `deleteProject(slug)` - Delete project (admin)

### Blog Service
- `getBlogs()` - Get all blogs
- `getBlog(slug)` - Get blog by slug
- `createBlog(data)` - Create blog (admin)
- `updateBlog(slug, data)` - Update blog (admin)
- `deleteBlog(slug)` - Delete blog (admin)

### Comment Service
- `getComments(entityType, entityId)` - Get comments
- `addComment(userId, entityType, entityId, content)` - Add comment
- `updateComment(id, content, userId)` - Update comment
- `deleteComment(id, userId)` - Delete comment

### Like Service
- `getLikeData(entityType, entityId, userId)` - Get like data
- `toggleLike(entityType, entityId, userId)` - Toggle like
- `getUserLikes(userId)` - Get user's likes

---

## 🎭 Mock Data

### Users (3)
- 1 Admin account
- 2 Regular user accounts
- Passwords stored in plain text (DEMO ONLY!)

### Projects (6)
- E-Commerce Platform
- Task Management App
- Weather Dashboard
- Social Media API
- Portfolio Generator
- AI Chatbot Platform

### Blog Posts (4)
- React tutorial
- TypeScript best practices
- Tailwind CSS guide
- Node.js microservices

### Comments & Likes
- Pre-populated on projects and blogs
- Simulated user interactions

---

## 🔐 Security Notes

### ⚠️ Current Limitations (Static Version)

1. **Passwords**: Stored in plain text (DEMO ONLY!)
2. **No Encryption**: All data visible in client
3. **No Validation**: Limited server-side checks
4. **Client-Side Only**: All logic runs in browser
5. **No Persistence**: Data resets on page refresh (except auth)
6. **No Rate Limiting**: Unlimited requests
7. **No CSRF Protection**: Not needed (no real backend)

### ✅ Backend Requirements

When integrating a real backend, you MUST:
- Hash passwords (bcrypt/argon2)
- Use HTTP-only cookies for sessions
- Validate all input server-side
- Implement rate limiting
- Add CSRF tokens
- Use real JWT with signatures
- Validate roles on server
- Sanitize user input
- Add security headers

---

## 📚 Documentation

### Main Documentation
- **[STATIC_ARCHITECTURE.md](./STATIC_ARCHITECTURE.md)** - Detailed architecture guide
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Database schema (for backend)

### Code Documentation
All services include detailed TODO comments for backend integration:

```typescript
/**
 * TODO: Backend Integration
 * - Replace with: POST /api/auth/login
 * - Implement JWT token handling
 * - Add session refresh logic
 */
```

---

## 🔄 Backend Integration Guide

### Quick Start

**1. Create API Client**
```typescript
// /src/lib/api-client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
```

**2. Update Services**
```typescript
// /src/services/auth.service.ts
import { apiClient } from '../lib/api-client';

export const signIn = async (credentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  return { session: data, error: null };
};
```

**3. Remove Mocks**
```bash
rm -rf /src/mocks
```

**4. Update Types**
Generate types from your API schema (OpenAPI/GraphQL)

### Migration Checklist

- [ ] Setup backend (Node.js, Python, etc.)
- [ ] Create database schema
- [ ] Implement authentication
- [ ] Create API endpoints
- [ ] Setup file storage (S3, Cloudinary)
- [ ] Update frontend services
- [ ] Remove mock data
- [ ] Add error boundaries
- [ ] Implement loading states
- [ ] Add proper validation
- [ ] Setup CI/CD
- [ ] Deploy

See **[STATIC_ARCHITECTURE.md](./STATIC_ARCHITECTURE.md)** for detailed migration instructions.

---

## 🎨 Customization

### Theme
Edit `/src/styles/theme.css` to customize colors, fonts, and spacing.

### Content
Update mock data in `/src/mocks/` to customize:
- Projects
- Blog posts
- User information
- About page content

### Components
All components are in `/src/app/components/` and use shadcn/ui.

---

## 🧪 Testing

Currently, no tests are included (static demo).

For production, add:
- Unit tests (Vitest)
- Integration tests
- E2E tests (Playwright/Cypress)

---

## 🚢 Deployment

### Static Hosting

This app can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**
- Any static hosting service

```bash
# Build
npm run build

# Output directory
./dist
```

### Environment Variables (for backend)

When integrating with a backend, add:

```bash
VITE_API_URL=https://api.example.com
VITE_JWT_EXPIRES_IN=24h
VITE_GITHUB_CLIENT_ID=xxx
VITE_GOOGLE_CLIENT_ID=xxx
```

---

## 📝 License

This is a demo/template project. Feel free to use it for your own portfolio!

---

## 🤝 Contributing

This is a template project, but suggestions are welcome!

---

## 📞 Support

For questions about the architecture or migration, see:
- [STATIC_ARCHITECTURE.md](./STATIC_ARCHITECTURE.md) - Architecture details
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Database schema

---

## 🎉 Features Summary

✅ Fully static (no backend required)  
✅ Complete authentication UI  
✅ User profiles with avatars  
✅ Comment system  
✅ Like/reaction system  
✅ Admin dashboard  
✅ Role-based access control  
✅ Responsive design  
✅ Dark mode  
✅ Smooth animations  
✅ TypeScript throughout  
✅ Clean architecture  
✅ Backend-ready  
✅ Well-documented  
✅ Production-ready UI  

---

## 🔮 Future Enhancements (Requires Backend)

- [ ] Email verification
- [ ] Password reset
- [ ] Two-factor authentication
- [ ] Real OAuth integration
- [ ] WebSocket for real-time updates
- [ ] Image optimization
- [ ] SEO (SSR/SSG)
- [ ] Analytics
- [ ] Search functionality
- [ ] Pagination
- [ ] Content moderation
- [ ] User notifications
- [ ] Email notifications

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
