import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {
  lucideDownload,
  lucideGraduationCap,
  lucideBriefcase,
  lucideCode2,
} from '@ng-icons/lucide';
import {SeoService} from '../../core/services/seo.service';
import {SEO_DATA} from '../../core/constants/seo.constants';
import {ABOUT_CONTENT} from './about.constants';

@Component({
  selector: 'app-about',
  imports: [NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideDownload,
      lucideGraduationCap,
      lucideBriefcase,
      lucideCode2,
    }),
  ],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class About {
  private seoService = inject(SeoService);

  readonly frontendSkills = ABOUT_CONTENT.skills.frontend;
  readonly backendSkills = ABOUT_CONTENT.skills.backend;
  readonly toolsSkills = ABOUT_CONTENT.skills.tools;
  readonly softSkills = ABOUT_CONTENT.skills.soft;

  constructor() {
    this.seoService.updateMetaTags(SEO_DATA.about);
  }
}
