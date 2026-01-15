import {ChangeDetectionStrategy, Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideArrowLeft, lucideCalendar, lucideClock, lucideTag, lucideUser,} from '@ng-icons/lucide';
import {BlogService} from '../../../core/services/blog.service';
import {SeoService} from '../../../core/services/seo.service';
import {LoadingSpinner} from '../../../shared/components/loading-spinner/loading-spinner';
import {Post, PostDetail} from '../../../core/models/post.model';
import DOMPurify from 'dompurify';

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
  private sanitizer = inject(DomSanitizer);

  slug = toSignal(this.route.paramMap.pipe(map(params => params.get('slug') ?? '')));

  private rawPost = signal<Post | null>(null);
  loading = signal(true);

  post = computed(() => {
    const p = this.rawPost();
    if (!p || !p.content) return null;

    const sanitizedContent = DOMPurify.sanitize(p.content, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3',
        'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
        'a', 'img', 'span', 'div'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
    });

    return {
      ...p,
      content: sanitizedContent,
    } as PostDetail;
  });

  readTime = computed(() => this.rawPost()?.readTime ?? null);

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
        this.rawPost.set(response.data);
        this.loading.set(false);

        if (response.data) {
          this.seoService.updateMetaTags({
            title: response.data.title,
            description: response.data.description,
            keywords: response.data.tags.join(', '),
          });
        }
      },
      error: (error) => {
        console.error('Failed to load post:', error);
        this.rawPost.set(null);
        this.loading.set(false);
      },
    });
  }
}
