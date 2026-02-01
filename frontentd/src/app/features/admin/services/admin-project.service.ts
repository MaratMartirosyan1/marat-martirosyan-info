import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {CreateProjectDto, Project, UpdateProjectDto} from '../../../core/models/project.model';
import {ApiListResponse, ApiSingleResponse} from '../../../core/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class AdminProjectService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly projectsUrl = this.apiUrl + '/admin/projects';

  getAll(): Observable<ApiListResponse<Project>> {
    return this.http.get<ApiListResponse<Project>>(this.projectsUrl);
  }

  getById(id: string): Observable<ApiSingleResponse<Project>> {
    return this.http.get<ApiSingleResponse<Project>>(`${this.projectsUrl}/${id}`);
  }

  create(projectData: CreateProjectDto): Observable<ApiSingleResponse<Project>> {
    return this.http.post<ApiSingleResponse<Project>>(this.projectsUrl, projectData);
  }

  update(id: string, projectData: UpdateProjectDto): Observable<ApiSingleResponse<Project>> {
    return this.http.put<ApiSingleResponse<Project>>(`${this.projectsUrl}/${id}`, projectData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.projectsUrl}/${id}`);
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
