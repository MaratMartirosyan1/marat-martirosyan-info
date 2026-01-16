import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-[var(--text-primary)]">Project Editor</h1>
      <div class="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] p-8 text-center">
        <p class="text-[var(--text-secondary)]">Project editor coming soon...</p>
      </div>
    </div>
  `,
})
export class ProjectEditor {}
