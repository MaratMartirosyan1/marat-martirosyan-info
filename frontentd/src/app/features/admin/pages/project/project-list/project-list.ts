import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-[var(--text-primary)]">Projects</h1>
        <button class="px-4 py-2 bg-gradient-angular text-white rounded-lg hover:opacity-90 transition-opacity">
          New Project
        </button>
      </div>
      <div class="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] p-8 text-center">
        <p class="text-[var(--text-secondary)]">Projects management coming soon...</p>
      </div>
    </div>
  `,
})
export class ProjectList {}
