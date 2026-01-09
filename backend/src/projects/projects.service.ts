import {Injectable} from '@nestjs/common';
import {Project, ProjectsResponse} from './interfaces/project.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProjectsService {
    private projects: Project[];

    constructor() {
        this.loadProjects();
    }

    private loadProjects(): void {
        const dataPath = path.join(process.cwd(), 'src/assets/data/projects.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        this.projects = JSON.parse(rawData);
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

    getProjectById(id: string): Project | undefined {
        return this.projects.find((project) => project.id === id);
    }
}
