export interface Project {
  id: string;
  title: string;
  intro: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  title: string;
  intro: string;
  description: string;
  image?: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface UpdateProjectDto {
  title?: string;
  intro?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  category?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}
