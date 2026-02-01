import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideExternalLink, lucideGithub} from '@ng-icons/lucide';
import {Project} from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({lucideExternalLink, lucideGithub})],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
}
