import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideClock, lucideTag, lucideUser} from '@ng-icons/lucide';
import {Post} from '../../../../core/models/post.model';

@Component({
  selector: 'app-blog-card',
  imports: [RouterLink, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({lucideClock, lucideTag, lucideUser})],
  templateUrl: './blog-card.html',
})
export class BlogCard {
  post = input.required<Post>();
}
