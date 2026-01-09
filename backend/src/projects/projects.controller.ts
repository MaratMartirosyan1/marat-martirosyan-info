import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  @Get('featured')
  getFeaturedProjects() {
    return this.projectsService.getFeaturedProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    const project = this.projectsService.getProjectById(id);
    if (!project) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }
    return project;
  }
}
