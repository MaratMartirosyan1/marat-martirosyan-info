import {Component, inject, ChangeDetectionStrategy, OnInit, signal} from '@angular/core';
import {RouterLink, ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {
  lucideClock,
  lucideCalendar,
  lucideUser,
  lucideArrowLeft,
  lucideTag,
} from '@ng-icons/lucide';
import {BlogService} from '../../../core/services/blog.service';
import {SeoService} from '../../../core/services/seo.service';
import {LoadingSpinner} from '../../../shared/components/loading-spinner/loading-spinner';
import {Post, PostDetail} from '../../../core/models/post.model';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, NgIconComponent, LoadingSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideClock,
      lucideCalendar,
      lucideUser,
      lucideArrowLeft,
      lucideTag,
    }),
  ],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.scss'],
})
export class BlogDetail {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private seoService = inject(SeoService);

  slug = toSignal(this.route.paramMap.pipe(map(params => params.get('slug') ?? '')));

  post = signal<PostDetail | null>(null);
  loading = signal(true);
  readTime = signal<number | null>(null);
}
