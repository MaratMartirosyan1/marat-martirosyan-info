import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideGithub, lucideLinkedin, lucideTwitter, lucideMail} from '@ng-icons/lucide';

@Component({
  selector: 'app-footer',
  imports: [NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({lucideGithub, lucideLinkedin, lucideTwitter, lucideMail})],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {
  initiationYear = 2025;
}
