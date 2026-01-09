import {ChangeDetectionStrategy, Component, computed, effect, inject} from '@angular/core';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideArrowDown, lucideArrowUp, lucideClock, lucideSearch, lucideTag} from '@ng-icons/lucide';
import {BlogService} from '../../../core/services/blog.service';
import {SeoService} from '../../../core/services/seo.service';
import {LoadingSpinner} from '../../../shared/components/loading-spinner/loading-spinner';
import {FormsModule} from '@angular/forms';
import {SEO_DATA} from '../../../core/constants/seo.constants';
import {BlogCategory, POSTS_DEFAULT_REQUEST_CRITERIA} from './blog-list.constants';
import {Pagination} from '../../../shared/components/pagination/pagination';
import {SortField} from '../../../core/models/types';
import {BlogListQueryParams, PostsRequestCriteria} from '../../../core/models/post.model';

@Component({
  selector: 'app-blog-list',
  imports: [RouterLink, NgIconComponent, LoadingSpinner, FormsModule, Pagination],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({lucideClock, lucideTag, lucideSearch, lucideArrowUp, lucideArrowDown})],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.scss'],
})
export class BlogList {
  private blogService = inject(BlogService);
  private seoService = inject(SeoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private queryParams = toSignal<BlogListQueryParams>(this.route.queryParams);

  readonly requestCriteria = computed(() => {
    const params = this.queryParams();
    return <PostsRequestCriteria>{
      search: params?.search ?? POSTS_DEFAULT_REQUEST_CRITERIA.search,
      category: params?.category ?? POSTS_DEFAULT_REQUEST_CRITERIA.category,
      page: params?.page ? +params.page : POSTS_DEFAULT_REQUEST_CRITERIA.page,
      sortBy: params?.sortBy ?? POSTS_DEFAULT_REQUEST_CRITERIA.sortBy,
      sortOrder: params?.sortOrder ?? POSTS_DEFAULT_REQUEST_CRITERIA.sortOrder,
      pageSize: POSTS_DEFAULT_REQUEST_CRITERIA.pageSize,
    };
  });

  readonly postsResource = rxResource({
    params: () => this.requestCriteria(),
    stream: (request) => this.blogService.getAll(request.params)
  });

  readonly posts = computed(() => this.postsResource.value()?.data ?? []);
  readonly pagination = computed(() => ({
    currentPage: this.requestCriteria().page,
    totalPages: this.postsResource.value()?.meta?.totalPages ?? 1,
    totalCount: this.postsResource.value()?.meta?.totalCount ?? 0
  }));

  constructor() {
    this.seoService.updateMetaTags(SEO_DATA.blog);
  }

  onSearchChange(query: string): void {
    void this.router.navigate([], {
      queryParams: {search: query.trim() || undefined, page: undefined},
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(page: number): void {
    void this.router.navigate([], {
      queryParams: {page: page === 1 ? undefined : page},
      queryParamsHandling: 'merge'
    });
  }

  onCategoryChange(category: BlogCategory): void {
    this.router.navigate([], {
      queryParams: {category: category === 'All Categories' ? undefined : category, page: undefined},
      queryParamsHandling: 'merge'
    });
  }

  onSortChange(field: SortField): void {
    const currentParams = this.requestCriteria();
    const newSortOrder = currentParams.sortBy === field && currentParams.sortOrder === 'desc' ? 'asc' : 'desc';
    this.router.navigate([], {
      queryParams: {
        sortBy: field === POSTS_DEFAULT_REQUEST_CRITERIA.sortBy ? undefined : field,
        sortOrder: newSortOrder === POSTS_DEFAULT_REQUEST_CRITERIA.sortOrder ? undefined : newSortOrder,
        page: undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  toggleSortOrder(): void {
    const currentParams = this.requestCriteria();
    const newSortOrder = currentParams.sortOrder === 'asc' ? 'desc' : 'asc';
    void this.router.navigate([], {
      queryParams: {
        sortOrder: newSortOrder === POSTS_DEFAULT_REQUEST_CRITERIA.sortOrder ? undefined : newSortOrder,
        page: undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  protected readonly Math = Math;
}
