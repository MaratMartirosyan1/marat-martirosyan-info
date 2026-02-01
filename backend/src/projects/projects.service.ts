import {Injectable, NotFoundException} from '@nestjs/common';
import {Project, ProjectsResponse, ProjectResponse} from './interfaces/project.interface';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProjectsService {
    private projects: Project[];
    private readonly dataPath = path.join(process.cwd(), 'src/assets/data/projects.json');

    constructor() {
        this.loadProjects();
    }

    private loadProjects(): void {
        const rawData = fs.readFileSync(this.dataPath, 'utf-8');
        this.projects = JSON.parse(rawData);
    }

    private saveProjects(): void {
        fs.writeFileSync(this.dataPath, JSON.stringify(this.projects, null, 2));
    }

    private generateId(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    getAllProjects(): ProjectsResponse {
        return {
            data: this.projects,
            meta: {
                currentPage: 1,
                totalPages: 1,
                totalCount: this.projects.length,
                pageSize: this.projects.length,
            }
        };
    }

    getFeaturedProjects(): ProjectsResponse {
        const featured = this.projects.filter((project) => project.featured);

        return {
            data: featured,
            meta: {
                currentPage: 1,
                totalPages: 1,
                totalCount: featured.length,
                pageSize: featured.length,
            }
        };
    }

    getProjectById(id: string): ProjectResponse | undefined {
        const project = this.projects.find((project) => project.id === id);
        if (!project) {
            return undefined;
        }
        return { data: project };
    }

    create(createProjectDto: CreateProjectDto): ProjectResponse {
        const id = this.generateId(createProjectDto.title);

        const existingProject = this.projects.find(p => p.id === id);
        if (existingProject) {
            throw new Error(`Project with id "${id}" already exists`);
        }

        const newProject: Project = {
            id,
            title: createProjectDto.title,
            intro: createProjectDto.intro,
            description: createProjectDto.description,
            image: createProjectDto.image || '',
            technologies: createProjectDto.technologies,
            category: createProjectDto.category,
            demoUrl: createProjectDto.demoUrl,
            githubUrl: createProjectDto.githubUrl,
            featured: createProjectDto.featured,
        };

        this.projects.unshift(newProject);
        this.saveProjects();

        return { data: newProject };
    }

    update(id: string, updateProjectDto: UpdateProjectDto): ProjectResponse {
        const index = this.projects.findIndex(p => p.id === id);
        if (index === -1) {
            throw new NotFoundException(`Project with id "${id}" not found`);
        }

        const updatedProject: Project = {
            ...this.projects[index],
            ...updateProjectDto,
        };

        this.projects[index] = updatedProject;
        this.saveProjects();

        return { data: updatedProject };
    }

    delete(id: string): void {
        const index = this.projects.findIndex(p => p.id === id);
        if (index === -1) {
            throw new NotFoundException(`Project with id "${id}" not found`);
        }

        this.projects.splice(index, 1);
        this.saveProjects();
    }
}
