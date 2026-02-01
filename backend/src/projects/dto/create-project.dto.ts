export class CreateProjectDto {
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
