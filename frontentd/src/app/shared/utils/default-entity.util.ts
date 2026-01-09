import {ApiListResponse, ApiSingleResponse} from '../../core/models/api-response';

export function defaultEntity<T>(data: T): ApiSingleResponse<T> {
  return {data, meta: undefined}
}

export function defaultEntityList<T>(data: T): ApiListResponse<T> {
  return {data, meta: {totalCount: 0, totalPages: 0, currentPage: 1}}
}
