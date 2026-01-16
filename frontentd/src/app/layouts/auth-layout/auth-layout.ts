import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, ThemeToggle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center relative">
      <div class="absolute top-4 right-4">
        <app-theme-toggle />
      </div>
      <router-outlet />
    </div>
  `,
})
export class AuthLayout {}
