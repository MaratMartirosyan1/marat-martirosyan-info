export interface ApiPagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ApiSingleResponse<T> {
  data: T;
}

export interface ApiListResponse<T, M = ApiPagination> {
  data: T[];
  meta: M;
}
