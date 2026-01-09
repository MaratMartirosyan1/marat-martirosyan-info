import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';

@Component({
  selector: 'app-pagination',
  imports: [NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideChevronLeft, lucideChevronRight })],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.scss'],
})
export class Pagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  disabled = input<boolean>(false);

  pageChange = output<number>();

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages() && !this.disabled()) {
      this.pageChange.emit(page);
    }
  }

  getPageNumbers(): (number | string)[] {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];

    if (current > 3) {
      pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }

    pages.push(total);

    return pages;
  }
}
