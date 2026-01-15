import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse } from '../../../core/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  private tokenSignal = signal<string | null>(this.getStoredToken());
  isAuthenticated = computed(() => !!this.tokenSignal());

  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          this.setToken(response.access_token);
        })
      );
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
    this.tokenSignal.set(token);
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
    this.tokenSignal.set(null);
  }
}
