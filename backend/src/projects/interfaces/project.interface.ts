import { ApiListResponse, ApiSingleResponse } from '../../common/interfaces/api-response';

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
  featured: boolean;
}

export type ProjectsResponse = ApiListResponse<Project>;
export type ProjectResponse = ApiSingleResponse<Project>;
