import {Component, ChangeDetectionStrategy, input, output, signal} from '@angular/core';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {
  lucideEllipsis,
  lucidePencil,
  lucideEye,
  lucideEyeOff,
  lucideTrash2,
  lucideClock
} from '@ng-icons/lucide';
import {Post} from '../../../../core/models/post.model';

@Component({
  selector: 'app-post-card',
  imports: [NgIconComponent],
  templateUrl: './post-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideEllipsis,
      lucidePencil,
      lucideEye,
      lucideEyeOff,
      lucideTrash2,
      lucideClock
    })
  ],
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class PostCard {
  post = input.required<Post>();

  edit = output<string>();
  delete = output<string>();
  publish = output<string>();
  unpublish = output<string>();
  cardClick = output<string>();

  menuOpen = signal(false);

  onCardClick(): void {
    if (!this.menuOpen()) {
      this.cardClick.emit(this.post().id!);
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
    this.edit.emit(this.post().id!);
  }

  onPublish(): void {
    this.menuOpen.set(false);
    this.publish.emit(this.post().id!);
  }

  onUnpublish(): void {
    this.menuOpen.set(false);
    this.unpublish.emit(this.post().id!);
  }

  onDelete(): void {
    this.menuOpen.set(false);
    this.delete.emit(this.post().id!);
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
