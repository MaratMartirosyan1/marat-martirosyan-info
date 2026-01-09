import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideX } from '@ng-icons/lucide';
import { signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ThemeToggle, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideMenu, lucideX })],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  mobileMenuOpen = signal(false);
}
