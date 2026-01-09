import {ChangeDetectionStrategy, Component, ElementRef, inject, input, output, signal} from '@angular/core';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideArrowUpDown, lucideChevronDown, lucideFilter} from '@ng-icons/lucide';

@Component({
  selector: 'app-dropdown',
  imports: [NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({lucideChevronDown, lucideFilter, lucideArrowUpDown})],
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.scss'],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  }
})
export class Dropdown<T> {
  private elementRef = inject(ElementRef);

  options = input.required<readonly T[]>();
  selectedOption = input<T>();
  placeholder = input<string>('Select...');
  mobileIcon = input<string>('lucideFilter');
  displayFn = input<(option: T) => string>((option) => String(option));

  optionSelected = output<T>();

  isOpen = signal(false);

  toggleDropdown(): void {
    this.isOpen.update(open => !open);
  }

  selectOption(option: T): void {
    this.optionSelected.emit(option);
    this.isOpen.set(false);
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
