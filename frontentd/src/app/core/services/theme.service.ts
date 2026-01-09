import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private readonly THEME_KEY = 'theme';

  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const theme = this.theme();
        localStorage.setItem(this.THEME_KEY, theme);
        this.applyTheme(theme);
      }
    });
  }

  toggleTheme(): void {
    this.theme.update((current) => (current === 'light' ? 'dark' : 'light'));
  }

  private getInitialTheme(): Theme {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.THEME_KEY) as Theme;
      if (stored) return stored;

      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  private applyTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }
}
