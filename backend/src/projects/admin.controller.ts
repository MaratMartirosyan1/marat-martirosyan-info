import { Controller, Post as HttpPost, Get, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin/projects')
@UseGuards(JwtAuthGuard)
export class AdminProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @HttpPost()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async getAll() {
    return this.projectsService.getAllProjects();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.projectsService.getProjectById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.projectsService.delete(id);
  }
}
