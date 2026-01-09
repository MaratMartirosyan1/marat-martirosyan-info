import {SortField, SortOrder} from '../../../core/models/types';
import {PostsRequestCriteria} from '../../../core/models/post.model';

export const BLOG_LIST_CONFIG = {
  defaultPageSize: 6,
  pageSizeOptions: [6, 12, 24],
  defaultSortField: 'date' as SortField,
  defaultSortOrder: 'desc' as SortOrder,
} as const;

export const BLOG_LIST_CONTENT = {
  categories: ['All Categories', 'Angular', 'Web Development', 'Psychology', 'Finance'] as const,
  sortFields: [
    {value: 'date' as SortField, label: 'Date'},
    {value: 'title' as SortField, label: 'Title'},
    {value: 'readTime' as SortField, label: 'Read Time'}
  ] as const,
} as const;

export type BlogCategory = typeof BLOG_LIST_CONTENT.categories[number];

export const POSTS_DEFAULT_REQUEST_CRITERIA: PostsRequestCriteria = {
  page: 1,
  pageSize: BLOG_LIST_CONFIG.defaultPageSize,
  sortBy: BLOG_LIST_CONFIG.defaultSortField,
  sortOrder: BLOG_LIST_CONFIG.defaultSortOrder,
  search: '',
  category: 'All Categories'
} as const;
