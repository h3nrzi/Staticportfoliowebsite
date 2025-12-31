/**
 * Mock Projects Data
 * 
 * TODO: Replace with real backend API
 * - GET /api/projects
 * - GET /api/projects/:id
 * - POST /api/projects
 * - PUT /api/projects/:id
 * - DELETE /api/projects/:id
 */

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description: string;
  image: string;
  technologies: string[];
  category: string;
  github_url?: string;
  live_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'project-1',
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with React, Node.js, and PostgreSQL',
    long_description: 'A comprehensive e-commerce solution featuring user authentication, product management, shopping cart, payment integration, and an admin dashboard. Built with modern web technologies and best practices.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redux', 'Express'],
    category: 'Full-Stack',
    github_url: 'https://github.com/example/ecommerce',
    live_url: 'https://example-ecommerce.com',
    featured: true,
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'project-2',
    slug: 'task-management-app',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    long_description: 'Team collaboration tool with drag-and-drop task boards, real-time synchronization, team chat, and project analytics. Features include task assignments, due dates, priority levels, and file attachments.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI', 'React DnD'],
    category: 'Frontend',
    github_url: 'https://github.com/example/task-manager',
    live_url: 'https://example-tasks.com',
    featured: true,
    created_at: new Date('2024-02-01').toISOString(),
    updated_at: new Date('2024-02-01').toISOString(),
  },
  {
    id: 'project-3',
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with interactive maps and forecasts',
    long_description: 'A beautiful weather application featuring current conditions, 7-day forecasts, interactive weather maps, and location-based alerts. Utilizes multiple weather APIs for accurate data.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800',
    technologies: ['React', 'TypeScript', 'OpenWeather API', 'Recharts', 'Tailwind CSS'],
    category: 'Frontend',
    github_url: 'https://github.com/example/weather',
    featured: false,
    created_at: new Date('2024-02-15').toISOString(),
    updated_at: new Date('2024-02-15').toISOString(),
  },
  {
    id: 'project-4',
    slug: 'social-media-api',
    title: 'Social Media API',
    description: 'RESTful API for a social media platform with authentication and real-time features',
    long_description: 'Scalable REST API built with Node.js and Express, featuring JWT authentication, user profiles, posts, comments, likes, follow system, and real-time notifications using WebSockets.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.io', 'Redis'],
    category: 'Backend',
    github_url: 'https://github.com/example/social-api',
    featured: true,
    created_at: new Date('2024-03-01').toISOString(),
    updated_at: new Date('2024-03-01').toISOString(),
  },
  {
    id: 'project-5',
    slug: 'portfolio-generator',
    title: 'Portfolio Generator',
    description: 'Automated portfolio website generator with customizable themes',
    long_description: 'A SaaS application that generates beautiful portfolio websites from user input. Features include multiple themes, drag-and-drop customization, SEO optimization, and one-click deployment.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Prisma'],
    category: 'Full-Stack',
    github_url: 'https://github.com/example/portfolio-gen',
    live_url: 'https://portfolio-gen.com',
    featured: false,
    created_at: new Date('2024-03-15').toISOString(),
    updated_at: new Date('2024-03-15').toISOString(),
  },
  {
    id: 'project-6',
    slug: 'ai-chatbot',
    title: 'AI Chatbot Platform',
    description: 'Intelligent chatbot platform powered by machine learning',
    long_description: 'AI-powered chatbot platform with natural language processing, context awareness, multi-language support, and integration capabilities with popular messaging platforms.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL', 'Docker'],
    category: 'Full-Stack',
    github_url: 'https://github.com/example/ai-chatbot',
    featured: false,
    created_at: new Date('2024-04-01').toISOString(),
    updated_at: new Date('2024-04-01').toISOString(),
  },
];

// Get all projects
export const getAllProjects = (): Project[] => {
  return [...MOCK_PROJECTS];
};

// Get project by slug
export const getProjectBySlug = (slug: string): Project | null => {
  return MOCK_PROJECTS.find(p => p.slug === slug) || null;
};

// Get featured projects
export const getFeaturedProjects = (): Project[] => {
  return MOCK_PROJECTS.filter(p => p.featured);
};

// Get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  return MOCK_PROJECTS.filter(p => p.category === category);
};
