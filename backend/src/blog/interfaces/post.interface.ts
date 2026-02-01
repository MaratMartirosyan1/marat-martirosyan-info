export interface Post {
  slug: string;
  title: string;
  intro?: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  readTime: number;
  featured: boolean;
}

export interface PostsResponse {
  data: Post[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
  }
}
