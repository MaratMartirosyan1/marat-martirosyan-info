import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import type {Project} from '../models/project.model';
import {environment} from '../../../environments/environment';
import {ApiListResponse, ApiSingleResponse} from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProjects(): Observable<ApiListResponse<Project>> {
    return this.http.get<ApiListResponse<Project>>(`${this.apiUrl}/projects`);
  }

  getFeaturedProjects(): Observable<ApiListResponse<Project>> {
    return this.http.get<ApiListResponse<Project>>(`${this.apiUrl}/projects/featured`);
  }

  getProjectById(id: string): Observable<ApiSingleResponse<Project>> {
    return this.http.get<ApiSingleResponse<Project>>(`${this.apiUrl}/projects/${id}`);
  }
}
