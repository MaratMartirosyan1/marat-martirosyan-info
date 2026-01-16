import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideFileText, lucideFolderKanban, lucideX } from '@ng-icons/lucide';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideFileText, lucideFolderKanban, lucideX })],
  template: `
    <aside
      class="min-h-52 hidden md:flex w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex-col rounded-lg"
    >
      <nav class="flex-1 p-4 space-y-2">
        <a
          routerLink="/admin/posts"
          routerLinkActive="bg-gradient-angular text-white"
          [routerLinkActiveOptions]="{ exact: false }"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-all"
        >
          <ng-icon name="lucideFileText" class="w-5 h-5" />
          <span>Posts</span>
        </a>
        <a
          routerLink="/admin/projects"
          routerLinkActive="bg-gradient-angular text-white"
          [routerLinkActiveOptions]="{ exact: false }"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-all"
        >
          <ng-icon name="lucideFolderKanban" class="w-5 h-5" />
          <span>Projects</span>
        </a>
      </nav>
    </aside>

    <!-- Mobile sidebar - overlay -->
    @if (isMobileOpen()) {
      <aside
        class="md:hidden fixed inset-0 z-50 w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col"
      >
        <div class="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
          <span class="font-semibold text-[var(--text-primary)]">Menu</span>
          <button
            (click)="closeMobile.emit()"
            class="p-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
          >
            <ng-icon name="lucideX" class="w-5 h-5 text-[var(--text-primary)]" />
          </button>
        </div>
        <nav class="flex-1 p-4 space-y-2">
          <a
            routerLink="/admin/posts"
            routerLinkActive="bg-gradient-angular text-white"
            [routerLinkActiveOptions]="{ exact: false }"
            (click)="closeMobile.emit()"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-all"
          >
            <ng-icon name="lucideFileText" class="w-5 h-5" />
            <span>Posts</span>
          </a>
          <a
            routerLink="/admin/projects"
            routerLinkActive="bg-gradient-angular text-white"
            [routerLinkActiveOptions]="{ exact: false }"
            (click)="closeMobile.emit()"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-all"
          >
            <ng-icon name="lucideFolderKanban" class="w-5 h-5" />
            <span>Projects</span>
          </a>
        </nav>
      </aside>
    }
  `,
})
export class AdminSidebar {
  isMobileOpen = input(false);
  closeMobile = output<void>();
}
