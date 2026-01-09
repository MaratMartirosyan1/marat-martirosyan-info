interface ApiResponse<T, M = undefined> {
  data: T;
  meta: M;
}

export interface ApiPagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export type ApiSingleResponse<T, M = undefined> = ApiResponse<T, M>;
export type ApiListResponse<T, M = ApiPagination> = ApiResponse<T, M>;
