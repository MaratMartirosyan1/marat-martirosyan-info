export const PROJECTS_CONTENT = {
  categories: ['All', 'Angular', 'Full-Stack', 'Open Source'] as const,
} as const;

export type ProjectCategory = typeof PROJECTS_CONTENT.categories[number];
