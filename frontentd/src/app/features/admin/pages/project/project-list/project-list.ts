import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AdminProjectService} from '../../../services/admin-project.service';
import {Project} from '../../../../../core/models/project.model';
import {ProjectCard} from '../../../components/project-card/project-card';

@Component({
  selector: 'app-project-list',
  imports: [RouterLink, ProjectCard],
  templateUrl: './project-list.html'
})
export class ProjectList implements OnInit {
  private adminProjectService = inject(AdminProjectService);
  private router = inject(Router);

  projects = signal<Project[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading.set(true);
    this.adminProjectService.getAll().subscribe({
      next: (response) => {
        this.projects.set(response.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load projects:', error);
        this.isLoading.set(false);
      },
    });
  }

  deleteProject(id: string): void {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      this.adminProjectService.delete(id).subscribe({
        next: () => {
          this.loadProjects();
        },
        error: (error) => {
          console.error('Failed to delete project:', error);
        },
      });
    }
  }

  editProject(id: string): void {
    void this.router.navigate(['/admin/projects/edit', id]);
  }
}
