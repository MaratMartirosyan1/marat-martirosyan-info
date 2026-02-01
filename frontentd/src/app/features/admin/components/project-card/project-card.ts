import {Component, ChangeDetectionStrategy, input, output, signal} from '@angular/core';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {
  lucideEllipsis,
  lucidePencil,
  lucideTrash2,
  lucideExternalLink,
  lucideGithub
} from '@ng-icons/lucide';
import {Project} from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [NgIconComponent],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideEllipsis,
      lucidePencil,
      lucideTrash2,
      lucideExternalLink,
      lucideGithub
    })
  ],
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class ProjectCard {
  project = input.required<Project>();

  edit = output<string>();
  delete = output<string>();
  cardClick = output<string>();

  menuOpen = signal(false);

  onCardClick(): void {
    if (!this.menuOpen()) {
      this.cardClick.emit(this.project().id);
    }
  }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen.update(open => !open);
  }

  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container')) {
      this.menuOpen.set(false);
    }
  }

  onEdit(): void {
    this.menuOpen.set(false);
    this.edit.emit(this.project().id);
  }

  onDelete(): void {
    this.menuOpen.set(false);
    this.delete.emit(this.project().id);
  }
}
