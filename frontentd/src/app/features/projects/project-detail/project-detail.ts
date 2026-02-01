import {ChangeDetectionStrategy, Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideArrowLeft, lucideExternalLink, lucideGithub, lucideStar} from '@ng-icons/lucide';
import {ProjectService} from '../../../core/services/project.service';
import {SeoService} from '../../../core/services/seo.service';
import {LoadingSpinner} from '../../../shared/components/loading-spinner/loading-spinner';
import {ContentRenderer} from '../../../shared/components/content-renderer/content-renderer';
import {Project} from '../../../core/models/project.model';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, NgIconComponent, LoadingSpinner, ContentRenderer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideExternalLink,
      lucideGithub,
      lucideStar,
    }),
  ],
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private seoService = inject(SeoService);

  id = toSignal(this.route.paramMap.pipe(map(params => params.get('id') ?? '')));

  project = signal<Project | null>(null);
  loading = signal(true);

  technologies = computed(() => this.project()?.technologies ?? []);

  constructor() {
    effect(() => {
      const currentId = this.id();
      if (currentId) {
        this.loadProject(currentId);
      }
    });
  }

  private loadProject(id: string): void {
    this.loading.set(true);
    this.projectService.getProjectById(id).subscribe({
      next: (response) => {
        this.project.set(response.data);
        this.loading.set(false);

        if (response.data) {
          this.seoService.updateMetaTags({
            title: response.data.title,
            description: response.data.description,
            keywords: response.data.technologies.join(', '),
          });
        }
      },
      error: (error) => {
        console.error('Failed to load project:', error);
        this.project.set(null);
        this.loading.set(false);
      },
    });
  }
}
