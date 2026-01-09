export class QueryPostsDto {
  page?: number = 1;
  pageSize?: number = 10;
  search?: string;
  category?: string;
  sortBy?: 'date' | 'title' | 'readTime' = 'date';
  sortOrder?: 'asc' | 'desc' = 'desc';
}
