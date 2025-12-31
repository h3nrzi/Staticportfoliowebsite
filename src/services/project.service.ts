/**
 * Project Service
 * 
 * This service handles all project-related operations.
 * Currently uses mock data, but designed to be easily replaced with real backend API.
 * 
 * TODO: Backend Integration
 * - Replace with: GET /api/projects
 * - Replace with: GET /api/projects/:slug
 * - Replace with: POST /api/projects (admin only)
 * - Replace with: PUT /api/projects/:slug (admin only)
 * - Replace with: DELETE /api/projects/:slug (admin only)
 */

import { getAllProjects, getProjectBySlug, getFeaturedProjects, Project, MOCK_PROJECTS } from '../mocks/projects';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all projects
 */
export const getProjects = async (): Promise<{ data: Project[]; error: Error | null }> => {
  await delay();
  
  try {
    const projects = getAllProjects();
    return { data: projects, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};

/**
 * Get project by slug
 */
export const getProject = async (slug: string): Promise<{ data: Project | null; error: Error | null }> => {
  await delay();
  
  try {
    const project = getProjectBySlug(slug);
    if (!project) {
      return { data: null, error: new Error('Project not found') };
    }
    return { data: project, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Get featured projects
 */
export const getFeatured = async (): Promise<{ data: Project[]; error: Error | null }> => {
  await delay();
  
  try {
    const projects = getFeaturedProjects();
    return { data: projects, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};

/**
 * Create project (admin only)
 */
export const createProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Project | null; error: Error | null }> => {
  await delay();
  
  try {
    // Check if slug already exists
    if (getProjectBySlug(projectData.slug)) {
      return { data: null, error: new Error('Project with this slug already exists') };
    }

    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    MOCK_PROJECTS.push(newProject);
    return { data: newProject, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Update project (admin only)
 */
export const updateProject = async (
  slug: string,
  updates: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ data: Project | null; error: Error | null }> => {
  await delay();
  
  try {
    const index = MOCK_PROJECTS.findIndex(p => p.slug === slug);
    if (index === -1) {
      return { data: null, error: new Error('Project not found') };
    }

    // If slug is being updated, check for conflicts
    if (updates.slug && updates.slug !== slug) {
      if (getProjectBySlug(updates.slug)) {
        return { data: null, error: new Error('Project with this slug already exists') };
      }
    }

    MOCK_PROJECTS[index] = {
      ...MOCK_PROJECTS[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    return { data: MOCK_PROJECTS[index], error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Delete project (admin only)
 */
export const deleteProject = async (slug: string): Promise<{ success: boolean; error: Error | null }> => {
  await delay();
  
  try {
    const index = MOCK_PROJECTS.findIndex(p => p.slug === slug);
    if (index === -1) {
      return { success: false, error: new Error('Project not found') };
    }

    MOCK_PROJECTS.splice(index, 1);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};
