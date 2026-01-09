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
  sortOptions: [
    {label: 'Date (Newest First)', field: 'date' as SortField, order: 'desc' as SortOrder},
    {label: 'Date (Oldest First)', field: 'date' as SortField, order: 'asc' as SortOrder},
    {label: 'Title (A-Z)', field: 'title' as SortField, order: 'asc' as SortOrder},
    {label: 'Title (Z-A)', field: 'title' as SortField, order: 'desc' as SortOrder},
    {label: 'Read Time (Shortest)', field: 'readTime' as SortField, order: 'asc' as SortOrder},
    {label: 'Read Time (Longest)', field: 'readTime' as SortField, order: 'desc' as SortOrder},
  ] as const,
} as const;

export type BlogCategory = typeof BLOG_LIST_CONTENT.categories[number];
export type BlogSortOption = typeof BLOG_LIST_CONTENT.sortOptions[number];

export const POSTS_DEFAULT_REQUEST_CRITERIA: PostsRequestCriteria = {
  page: 1,
  pageSize: BLOG_LIST_CONFIG.defaultPageSize,
  sortBy: BLOG_LIST_CONFIG.defaultSortField,
  sortOrder: BLOG_LIST_CONFIG.defaultSortOrder,
  search: '',
  category: 'All Categories'
} as const;
