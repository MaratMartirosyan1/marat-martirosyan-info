import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DOMPurify from 'isomorphic-dompurify';
import { Project } from './entities/project';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiSingleResponse, ApiListResponse } from '../common/interfaces/api-response';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ApiSingleResponse<Project>> {
    const sanitizedDescription = this.sanitizeHtml(createProjectDto.description);

    const project = this.projectRepository.create({
      ...createProjectDto,
      description: sanitizedDescription,
    });

    const saved = await this.projectRepository.save(project);
    return { data: saved };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ApiSingleResponse<Project>> {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (updateProjectDto.description) {
      updateProjectDto.description = this.sanitizeHtml(updateProjectDto.description);
    }

    Object.assign(project, updateProjectDto);

    const saved = await this.projectRepository.save(project);
    return { data: saved };
  }

  async delete(id: string): Promise<void> {
    const result = await this.projectRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }
  }

  async getAll(page: number = 1, pageSize: number = 10): Promise<ApiListResponse<Project>> {
    const [projects, totalCount] = await this.projectRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      data: projects,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount,
        pageSize,
      },
    };
  }

  async getById(id: string): Promise<ApiSingleResponse<Project>> {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return { data: project };
  }

  async getFeatured(limit: number = 3): Promise<ApiListResponse<Project>> {
    const projects = await this.projectRepository.find({
      where: { featured: true },
      order: { createdAt: 'DESC' },
      take: limit,
    });

    return {
      data: projects,
      meta: {
        currentPage: 1,
        totalPages: 1,
        totalCount: projects.length,
        pageSize: limit,
      },
    };
  }

  private sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3',
        'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
        'a', 'img', 'span', 'div'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
    });
  }
}
