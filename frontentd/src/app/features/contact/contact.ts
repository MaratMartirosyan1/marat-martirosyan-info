import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideMail, lucideMapPin, lucideSend} from '@ng-icons/lucide';
import {SeoService} from '../../core/services/seo.service';
import {SEO_DATA} from '../../core/constants/seo.constants';
import {CONTACT_CONFIG} from './contact.constants';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({lucideMail, lucideMapPin, lucideSend})],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  private fb = inject(NonNullableFormBuilder);
  private seoService = inject(SeoService);

  readonly isSubmitting = signal(false);
  readonly submitStatus = signal<'success' | 'error' | null>(null);

  readonly contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(CONTACT_CONFIG.validation.messageMinLength)]],
  });

  constructor() {
    this.seoService.updateMetaTags(SEO_DATA.contact);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set(null);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitStatus.set('success');
      this.contactForm.reset();

      setTimeout(() => this.submitStatus.set(null), CONTACT_CONFIG.timeouts.successMessage);
    }, CONTACT_CONFIG.timeouts.submit);
  }
}
