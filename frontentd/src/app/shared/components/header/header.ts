import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideX, lucideUser, lucideLayoutDashboard, lucideLogOut, lucideChevronDown } from '@ng-icons/lucide';
import { AuthService } from '../../../features/admin/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ThemeToggle, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideMenu, lucideX, lucideUser, lucideLayoutDashboard, lucideLogOut, lucideChevronDown })],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  private authService = inject(AuthService);

  mobileMenuOpen = signal(false);
  accountDropdownOpen = signal(false);
  isAuthenticated = this.authService.isAuthenticated;

  toggleAccountDropdown(): void {
    this.accountDropdownOpen.update(open => !open);
  }

  closeAccountDropdown(): void {
    this.accountDropdownOpen.set(false);
  }

  logout(): void {
    this.closeAccountDropdown();
    this.authService.logout();
  }
}
