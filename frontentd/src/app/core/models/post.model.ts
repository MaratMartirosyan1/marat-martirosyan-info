import {SortField, SortOrder} from './types';

export interface Post {
  id?: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  coverImage?: string;
  readTime?: number;
  featured?: boolean;
  status?: 'draft' | 'published';
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface PostDetail extends Post {
  content: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
  coverImage?: string;
  tags: string[];
  category: string;
  featured: boolean;
  status: 'draft' | 'published';
  author: string;
}

export interface UpdatePostDto extends Partial<CreatePostDto> {}

export interface AuthResponse {
  message: string;
  access_token: string;
  admin: {
    id: string;
    email: string;
    role: string;
  };
}

export interface PostsRequestCriteria {
  page: number;
  pageSize: number;
  search: string;
  category: string;
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

