import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Post, CreatePostDto, UpdatePostDto} from '../../../core/models/post.model';
import {ApiSingleResponse, ApiListResponse} from '../../../core/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class AdminPostService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly postsUrl = this.apiUrl + '/admin/blog/posts'

  getAll(): Observable<ApiListResponse<Post[]>> {
    return this.http.get<ApiListResponse<Post[]>>(this.postsUrl);
  }

  getById(id: string): Observable<ApiSingleResponse<Post>> {
    return this.http.get<ApiSingleResponse<Post>>(`${this.postsUrl}/${id}`);
  }

  create(postData: CreatePostDto): Observable<ApiSingleResponse<Post>> {
    return this.http.post<ApiSingleResponse<Post>>(this.postsUrl, postData);
  }

  update(id: string, postData: UpdatePostDto): Observable<ApiSingleResponse<Post>> {
    return this.http.put<ApiSingleResponse<Post>>(`${this.postsUrl}/${id}`, postData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.postsUrl}/${id}`);
  }

  publish(id: string): Observable<ApiSingleResponse<Post>> {
    return this.http.patch<ApiSingleResponse<Post>>(`${this.postsUrl}/${id}/publish`, {});
  }

  unpublish(id: string): Observable<ApiSingleResponse<Post>> {
    return this.http.patch<ApiSingleResponse<Post>>(`${this.postsUrl}/${id}/unpublish`, {});
  }

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload/image`, formData);
  }

  deleteImage(url: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/upload/image`, { body: { url } });
  }
}
