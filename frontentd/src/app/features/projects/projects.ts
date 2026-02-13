import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {SeoService} from '../../core/services/seo.service';
import {ProjectService} from '../../core/services/project.service';
import {SEO_DATA} from '../../core/constants/seo.constants';
import {ProjectCategory, PROJECTS_CONTENT} from './projects.constants';
import {defaultEntityList} from '../../shared/utils/default-entity.util';
import {Project} from '../../core/models/project.model';
import {ProjectCard} from './components/project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class Projects {
  private projectService = inject(ProjectService);
  private seoService = inject(SeoService);

  readonly projectsResponse = toSignal(this.projectService.getProjects(), {initialValue: defaultEntityList<Project>([])});
  readonly projects = computed(() => this.projectsResponse().data);
  readonly selectedCategory = signal<ProjectCategory>('All');
  readonly categories = PROJECTS_CONTENT.categories;

  filteredProjects = computed(() => {
    const category = this.selectedCategory();
    if (category === 'All') return this.projects();
    return this.projects().filter((p) => p.category === category);
  });

  constructor() {
    this.seoService.updateMetaTags(SEO_DATA.projects);
  }
}
