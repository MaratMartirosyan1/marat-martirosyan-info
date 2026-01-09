import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post, PostsRequestCriteria} from '../models/post.model';
import {environment} from '../../../environments/environment';
import {ApiListResponse, ApiSingleResponse} from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getFeaturedPosts(limit: number = 3): Observable<ApiListResponse<Post[]>> {
    return this.http.get<ApiListResponse<Post[]>>(`${this.apiUrl}/blog/featured`, {
      params: {limit: limit.toString()}
    });
  }

  getAll(params: PostsRequestCriteria): Observable<ApiListResponse<Post[]>> {
    let httpParams = new HttpParams();

    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.category) httpParams = httpParams.set('category', params.category);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortOrder) httpParams = httpParams.set('sortOrder', params.sortOrder);

    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    return this.http.get<ApiListResponse<Post[]>>(`${this.apiUrl}/blog/posts`, {
      params: httpParams,
      headers
    });
  }

  getPostBySlug(slug: string): Observable<ApiSingleResponse<Post>> {
    return this.http.get<ApiSingleResponse<Post>>(`${this.apiUrl}/blog/posts/${slug}`);
  }
}
