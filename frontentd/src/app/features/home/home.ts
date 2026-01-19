import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideArrowRight, lucideCode, lucideRocket, lucideStar} from '@ng-icons/lucide';
import {BlogService} from '../../core/services/blog.service';
import {SeoService} from '../../core/services/seo.service';
import {SEO_DATA} from '../../core/constants/seo.constants';
import {defaultEntityList} from '../../shared/utils/default-entity.util';
import {Post} from '../../core/models/post.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({lucideArrowRight, lucideCode, lucideRocket, lucideStar})],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  private blogService = inject(BlogService);
  private seoService = inject(SeoService);

  readonly featuredPostsResponse = toSignal(this.blogService.getFeaturedPosts(3), {initialValue: defaultEntityList<Post>([])});

  constructor() {
    this.seoService.updateMetaTags(SEO_DATA.home);
  }
}
