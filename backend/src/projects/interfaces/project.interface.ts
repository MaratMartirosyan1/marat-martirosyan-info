export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ProjectsResponse {
  data: Project[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}
