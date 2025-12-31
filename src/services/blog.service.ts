/**
 * Blog Service
 * 
 * This service handles all blog-related operations.
 * Currently uses mock data, but designed to be easily replaced with real backend API.
 * 
 * TODO: Backend Integration
 * - Replace with: GET /api/blogs
 * - Replace with: GET /api/blogs/:slug
 * - Replace with: POST /api/blogs (admin only)
 * - Replace with: PUT /api/blogs/:slug (admin only)
 * - Replace with: DELETE /api/blogs/:slug (admin only)
 */

import { getAllBlogs, getBlogBySlug, BlogPost, MOCK_BLOGS } from '../mocks/blogs';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all published blogs
 */
export const getBlogs = async (): Promise<{ data: BlogPost[]; error: Error | null }> => {
  await delay();
  
  try {
    const blogs = getAllBlogs();
    return { data: blogs, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};

/**
 * Get blog by slug
 */
export const getBlog = async (slug: string): Promise<{ data: BlogPost | null; error: Error | null }> => {
  await delay();
  
  try {
    const blog = getBlogBySlug(slug);
    if (!blog) {
      return { data: null, error: new Error('Blog post not found') };
    }
    return { data: blog, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Create blog post (admin only)
 */
export const createBlog = async (blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: BlogPost | null; error: Error | null }> => {
  await delay();
  
  try {
    // Check if slug already exists
    if (getBlogBySlug(blogData.slug)) {
      return { data: null, error: new Error('Blog post with this slug already exists') };
    }

    const newBlog: BlogPost = {
      ...blogData,
      id: `blog-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    MOCK_BLOGS.push(newBlog);
    return { data: newBlog, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Update blog post (admin only)
 */
export const updateBlog = async (
  slug: string,
  updates: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ data: BlogPost | null; error: Error | null }> => {
  await delay();
  
  try {
    const index = MOCK_BLOGS.findIndex(b => b.slug === slug);
    if (index === -1) {
      return { data: null, error: new Error('Blog post not found') };
    }

    // If slug is being updated, check for conflicts
    if (updates.slug && updates.slug !== slug) {
      if (getBlogBySlug(updates.slug)) {
        return { data: null, error: new Error('Blog post with this slug already exists') };
      }
    }

    MOCK_BLOGS[index] = {
      ...MOCK_BLOGS[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    return { data: MOCK_BLOGS[index], error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Delete blog post (admin only)
 */
export const deleteBlog = async (slug: string): Promise<{ success: boolean; error: Error | null }> => {
  await delay();
  
  try {
    const index = MOCK_BLOGS.findIndex(b => b.slug === slug);
    if (index === -1) {
      return { success: false, error: new Error('Blog post not found') };
    }

    MOCK_BLOGS.splice(index, 1);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};
