# Quick Start Guide - Static Portfolio

## 🚀 Get Running in 2 Minutes

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:5173
```

## 🔑 Demo Login

**Admin Dashboard Access:**
```
Email: admin@example.com
Password: admin123
```

**Regular User:**
```
Email: john@example.com
Password: user123
```

---

## 📂 File Structure (Key Files)

```
/src
├── /mocks              ← All static data lives here
│   ├── users.ts        ← User accounts & credentials
│   ├── projects.ts     ← Portfolio projects
│   ├── blogs.ts        ← Blog posts
│   ├── comments.ts     ← Comments data
│   └── likes.ts        ← Likes data
│
├── /services           ← Service layer (like API calls)
│   ├── auth.service.ts     ← Login, register, session
│   ├── user.service.ts     ← User profiles
│   ├── project.service.ts  ← Projects CRUD
│   ├── blog.service.ts     ← Blog CRUD
│   ├── comment.service.ts  ← Comments
│   └── like.service.ts     ← Likes/reactions
│
├── /contexts           ← React contexts
│   └── AuthContext.tsx ← Auth state management
│
└── /app                ← UI components
    ├── /pages          ← Page components
    ├── /components     ← Reusable components
    └── App.tsx         ← Main app & routing
```

---

## 🎯 Common Tasks

### Add a New Project

Edit `/src/mocks/projects.ts`:

```typescript
export const MOCK_PROJECTS: Project[] = [
  // ... existing projects
  {
    id: 'project-new',
    slug: 'my-new-project',
    title: 'My New Project',
    description: 'Short description',
    long_description: 'Detailed description here...',
    image: 'https://images.unsplash.com/photo-xxx',
    technologies: ['React', 'TypeScript'],
    category: 'Frontend',
    github_url: 'https://github.com/username/repo',
    live_url: 'https://example.com',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
```

### Add a New Blog Post

Edit `/src/mocks/blogs.ts`:

```typescript
export const MOCK_BLOGS: BlogPost[] = [
  // ... existing blogs
  {
    id: 'blog-new',
    slug: 'my-blog-post',
    title: 'My Blog Post Title',
    excerpt: 'Short summary...',
    content: `# Full markdown content here...`,
    cover_image: 'https://images.unsplash.com/photo-xxx',
    author_id: 'user-2', // from users.ts
    tags: ['React', 'Tutorial'],
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    read_time: 5, // minutes
  },
];
```

### Add a New User

Edit `/src/mocks/users.ts`:

```typescript
export const MOCK_USERS: User[] = [
  // ... existing users
  {
    id: 'user-new',
    email: 'newuser@example.com',
    password: 'password123', // DEMO ONLY!
    role: 'user', // or 'admin'
    full_name: 'New User',
    username: 'newuser',
    display_name: 'New User',
    bio: 'My bio here...',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newuser',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
```

### Change Theme Colors

Edit `/src/styles/theme.css`:

```css
@theme {
  --color-primary: #00d4ff;  /* Change this */
  --color-accent: #00d4ff;   /* And this */
}
```

---

## 🔧 Development Tips

### Network Delay Simulation

All services have artificial delays (500ms). To change:

```typescript
// In any service file
const delay = (ms: number = 500) => ...
// Change 500 to your desired delay
```

### Disable Delays for Testing

```typescript
const delay = (ms: number = 0) => Promise.resolve();
```

### Check What Data Exists

```typescript
// In browser console
import { MOCK_USERS } from './mocks/users';
console.log(MOCK_USERS);
```

Or use React DevTools to inspect state.

---

## 🐛 Troubleshooting

### "Data not persisting"
✅ **Expected** - Only auth session persists (localStorage).  
All other data resets on refresh.

### "Can't log in"
✅ Check you're using correct credentials from `/src/mocks/users.ts`

### "Avatar upload doesn't save"
✅ **Expected** - File uploads generate preview URLs only.  
Real uploads require backend.

### "Real-time updates not working"
✅ **Expected** - No WebSockets in static version.  
Reload page to see updates.

---

## 📦 Build for Production

```bash
npm run build
```

Output: `./dist`

Deploy to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Cloudflare Pages

---

## 🔄 Moving to Real Backend

See [STATIC_ARCHITECTURE.md](./STATIC_ARCHITECTURE.md) for full guide.

**Quick version:**

1. **Create API endpoints** matching service signatures
2. **Create API client** (axios/fetch)
3. **Update services** to use API client instead of mocks
4. **Remove `/src/mocks` directory**
5. **Update types** from API schema
6. **Deploy backend** and frontend

---

## 📚 More Documentation

- **[README_STATIC.md](./README_STATIC.md)** - Full README
- **[STATIC_ARCHITECTURE.md](./STATIC_ARCHITECTURE.md)** - Architecture details
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - DB schema for backend

---

## 🎨 UI Components

Using **shadcn/ui** components:
- Button
- Card
- Input
- Textarea
- Select
- Dialog
- Toast
- Avatar
- Badge
- Alert
- Separator
- And more...

See `/src/app/components/ui/` for all components.

---

## 🔑 Key Concepts

### Services = API Layer
Services abstract data operations. Components NEVER import mocks directly.

```typescript
// ❌ Bad
import { MOCK_USERS } from '../mocks/users';

// ✅ Good  
import * as userService from '../services/user.service';
await userService.getUsers();
```

### Mocks = Temporary Database
Mock files simulate a database. They'll be removed when you add a real backend.

### Types = Source of Truth
All TypeScript types are in `/src/types/index.ts`. These will be generated from your API schema later.

---

## 💡 Pro Tips

1. **Use the admin account** to see all features
2. **Check browser console** for helpful logs
3. **Use React DevTools** to inspect state
4. **Read TODO comments** in service files for backend hints
5. **Keep services simple** - easy to replace later

---

## 🎯 Next Steps

1. ✅ Run the app
2. ✅ Login with demo credentials
3. ✅ Explore all pages
4. ✅ Try the admin dashboard
5. ✅ Add your own projects/blogs
6. ✅ Customize the theme
7. ✅ Read the architecture docs
8. ✅ Plan your backend integration

---

**Happy coding! 🚀**
