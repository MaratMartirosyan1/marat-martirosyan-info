export const PROJECTS_CONTENT = {
  categories: ['All', 'Angular', 'Full-Stack'] as const,
} as const;

export type ProjectCategory = typeof PROJECTS_CONTENT.categories[number];
