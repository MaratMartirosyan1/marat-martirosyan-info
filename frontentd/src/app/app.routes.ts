import { Routes } from '@angular/router';
import { authGuard } from './features/admin/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog-list/blog-list').then((m) => m.BlogList),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./features/blog/blog-detail/blog-detail').then(
        (m) => m.BlogDetail
      ),
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/login/login').then((m) => m.Login),
  },
  {
    path: 'admin/posts',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/post-list/post-list').then((m) => m.PostList),
  },
  {
    path: 'admin/posts/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/post-editor/post-editor').then((m) => m.PostEditor),
  },
  {
    path: 'admin/posts/edit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/post-editor/post-editor').then((m) => m.PostEditor),
  },
  {
    path: 'admin',
    redirectTo: 'admin/posts',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
