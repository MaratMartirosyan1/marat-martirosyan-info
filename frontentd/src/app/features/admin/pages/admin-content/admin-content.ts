import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';
import { AdminSidebar } from '../../components/admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-content',
  imports: [RouterOutlet, AdminSidebar, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideMenu })],
  template: `
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex gap-6 min-h-[calc(100vh-16rem)]">
        <!-- Mobile menu button -->
        <button
          (click)="mobileMenuOpen.set(true)"
          class="md:hidden fixed bottom-4 right-4 z-40 p-3 bg-gradient-angular text-white rounded-full shadow-lg"
        >
          <ng-icon name="lucideMenu" class="w-6 h-6" />
        </button>

        <!-- Mobile overlay -->
        @if (mobileMenuOpen()) {
          <div
            (click)="mobileMenuOpen.set(false)"
            class="fixed inset-0 bg-black/50 z-40 md:hidden"
          ></div>
        }

        <!-- Sidebar -->
        <app-admin-sidebar
          [isMobileOpen]="mobileMenuOpen()"
          (closeMobile)="mobileMenuOpen.set(false)"
        />

        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
})
export class AdminContent {
  mobileMenuOpen = signal(false);
}
