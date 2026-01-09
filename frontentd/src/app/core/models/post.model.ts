import {SortField, SortOrder} from './types';

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  image?: string;
  readTime?: number;
  featured?: boolean;
}

export interface PostDetail extends Post {
  content: string;
}

export interface PostsRequestCriteria {
  page: number;
  pageSize: number;
  search: string;
  category?: string;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}

export interface BlogListQueryParams {
  search?: string;
  category?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

