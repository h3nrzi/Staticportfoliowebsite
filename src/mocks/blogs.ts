/**
 * Mock Blogs Data
 * 
 * TODO: Replace with real backend API
 * - GET /api/blogs
 * - GET /api/blogs/:slug
 * - POST /api/blogs
 * - PUT /api/blogs/:slug
 * - DELETE /api/blogs/:slug
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_id: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
  read_time: number; // in minutes
}

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'getting-started-with-react',
    title: 'Getting Started with React in 2024',
    excerpt: 'A comprehensive guide to starting your React journey with modern best practices and tools.',
    content: `# Getting Started with React in 2024

React has evolved significantly over the years, and 2024 brings even more exciting features and improvements. In this guide, we'll explore the best ways to start your React journey.

## Why React?

React remains one of the most popular frontend libraries due to its:
- Component-based architecture
- Virtual DOM for optimal performance
- Rich ecosystem and community support
- Excellent developer experience

## Setting Up Your Environment

The easiest way to start a React project is using Vite:

\`\`\`bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev
\`\`\`

## Key Concepts to Master

1. **Components**: Building blocks of React applications
2. **Props**: Passing data between components
3. **State**: Managing component data
4. **Hooks**: Modern way to handle state and side effects
5. **Context**: Global state management

## Conclusion

React is an excellent choice for building modern web applications. Start small, practice regularly, and gradually build more complex projects.`,
    cover_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    author_id: 'user-2',
    tags: ['React', 'JavaScript', 'Web Development', 'Tutorial'],
    published: true,
    created_at: new Date('2024-01-10').toISOString(),
    updated_at: new Date('2024-01-10').toISOString(),
    read_time: 5,
  },
  {
    id: 'blog-2',
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Projects',
    excerpt: 'Learn how to leverage TypeScript effectively in large-scale applications.',
    content: `# TypeScript Best Practices for Large Projects

TypeScript has become essential for building maintainable large-scale applications. Here are the best practices I've learned.

## Strict Mode is Your Friend

Always enable strict mode in your tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## Use Type Inference Wisely

Let TypeScript infer types when possible, but be explicit when it improves readability.

## Create Reusable Types

Define shared types in a central location:

\`\`\`typescript
// types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
}
\`\`\`

## Leverage Utility Types

TypeScript provides powerful utility types like Partial, Pick, Omit, and Record.

## Conclusion

Following these practices will help you build more maintainable and type-safe applications.`,
    cover_image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    author_id: 'user-2',
    tags: ['TypeScript', 'Best Practices', 'Programming'],
    published: true,
    created_at: new Date('2024-02-05').toISOString(),
    updated_at: new Date('2024-02-05').toISOString(),
    read_time: 7,
  },
  {
    id: 'blog-3',
    slug: 'building-responsive-layouts',
    title: 'Building Responsive Layouts with Tailwind CSS',
    excerpt: 'Master responsive design patterns using Tailwind CSS utility classes.',
    content: `# Building Responsive Layouts with Tailwind CSS

Tailwind CSS makes building responsive layouts intuitive and efficient. Let's explore the best approaches.

## Mobile-First Approach

Tailwind uses a mobile-first breakpoint system:

\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3">
  Responsive div
</div>
\`\`\`

## Common Breakpoints

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Flexbox and Grid

Use Tailwind's flexbox and grid utilities for powerful layouts:

\`\`\`html
<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1">Column 1</div>
  <div class="flex-1">Column 2</div>
</div>
\`\`\`

## Conclusion

With Tailwind's responsive utilities, creating beautiful responsive layouts has never been easier.`,
    cover_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
    author_id: 'user-3',
    tags: ['CSS', 'Tailwind', 'Responsive Design', 'Frontend'],
    published: true,
    created_at: new Date('2024-03-01').toISOString(),
    updated_at: new Date('2024-03-01').toISOString(),
    read_time: 6,
  },
  {
    id: 'blog-4',
    slug: 'nodejs-microservices',
    title: 'Building Microservices with Node.js',
    excerpt: 'A practical guide to designing and implementing microservices architecture.',
    content: `# Building Microservices with Node.js

Microservices architecture offers scalability and maintainability. Here's how to implement it with Node.js.

## Why Microservices?

Benefits include:
- Independent deployment
- Technology flexibility
- Better scalability
- Fault isolation

## Service Communication

Use HTTP/REST or message queues for inter-service communication.

## Best Practices

1. Keep services focused
2. Implement proper monitoring
3. Use API gateways
4. Handle failures gracefully

## Conclusion

Microservices can greatly improve your application's architecture when implemented correctly.`,
    cover_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    author_id: 'user-2',
    tags: ['Node.js', 'Microservices', 'Architecture', 'Backend'],
    published: true,
    created_at: new Date('2024-03-20').toISOString(),
    updated_at: new Date('2024-03-20').toISOString(),
    read_time: 8,
  },
];

// Get all published blogs
export const getAllBlogs = (): BlogPost[] => {
  return MOCK_BLOGS.filter(b => b.published);
};

// Get blog by slug
export const getBlogBySlug = (slug: string): BlogPost | null => {
  return MOCK_BLOGS.find(b => b.slug === slug && b.published) || null;
};

// Get blogs by tag
export const getBlogsByTag = (tag: string): BlogPost[] => {
  return MOCK_BLOGS.filter(b => b.published && b.tags.includes(tag));
};

// Get blogs by author
export const getBlogsByAuthor = (authorId: string): BlogPost[] => {
  return MOCK_BLOGS.filter(b => b.author_id === authorId && b.published);
};
