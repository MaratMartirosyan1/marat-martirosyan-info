import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from '../../features/admin/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const isAdmin = authService.isAuthenticated();

  if (token && isAdmin) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
