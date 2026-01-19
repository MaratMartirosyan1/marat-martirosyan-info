import {ChangeDetectionStrategy, Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideArrowLeft, lucideCalendar, lucideClock, lucideTag, lucideUser,} from '@ng-icons/lucide';
import {BlogService} from '../../../core/services/blog.service';
import {SeoService} from '../../../core/services/seo.service';
import {LoadingSpinner} from '../../../shared/components/loading-spinner/loading-spinner';
import {ContentRenderer} from '../../../shared/components/content-renderer/content-renderer';
import {Post} from '../../../core/models/post.model';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, NgIconComponent, LoadingSpinner, ContentRenderer],
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

  post = signal<Post | null>(null);
  loading = signal(true);

  readTime = computed(() => this.post()?.readTime ?? null);

  constructor() {
    effect(() => {
      const currentSlug = this.slug();
      if (currentSlug) {
        this.loadPost(currentSlug);
      }
    });
  }

  private loadPost(slug: string): void {
    this.loading.set(true);
    this.blogService.getPostBySlug(slug).subscribe({
      next: (response) => {
        this.post.set(response.data);
        this.loading.set(false);

        if (response.data) {
          this.seoService.updateMetaTags({
            title: response.data.title,
            description: response.data.content,
            keywords: response.data.tags.join(', '),
          });
        }
      },
      error: (error) => {
        console.error('Failed to load post:', error);
        this.post.set(null);
        this.loading.set(false);
      },
    });
  }
}
