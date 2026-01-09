import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSun, lucideMoon } from '@ng-icons/lucide';

@Component({
  selector: 'app-theme-toggle',
  imports: [NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideSun, lucideMoon })],
  templateUrl: './theme-toggle.html',
  styleUrls: ['./theme-toggle.scss'],
})
export class ThemeToggle {
  themeService = inject(ThemeService);
}
