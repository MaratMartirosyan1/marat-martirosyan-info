import { Routes } from '@angular/router';
import { authGuard } from './features/admin/services/auth.guard';

export const routes: Routes = [
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/pages/login/login').then((m) => m.Login),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
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
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/admin/pages/admin-content/admin-content').then(
            (m) => m.AdminContent
          ),
        children: [
          {
            path: '',
            redirectTo: 'posts',
            pathMatch: 'full',
          },
          {
            path: 'posts',
            loadComponent: () =>
              import('./features/admin/pages/post/post-list/post-list').then(
                (m) => m.PostList
              ),
          },
          {
            path: 'posts/new',
            loadComponent: () =>
              import('./features/admin/pages/post/post-editor/post-editor').then(
                (m) => m.PostEditor
              ),
          },
          {
            path: 'posts/edit/:id',
            loadComponent: () =>
              import('./features/admin/pages/post/post-editor/post-editor').then(
                (m) => m.PostEditor
              ),
          },
          {
            path: 'projects',
            loadComponent: () =>
              import('./features/admin/pages/project/project-list/project-list').then(
                (m) => m.ProjectList
              ),
          },
          {
            path: 'projects/new',
            loadComponent: () =>
              import('./features/admin/pages/project/project-editor/project-editor').then(
                (m) => m.ProjectEditor
              ),
          },
          {
            path: 'projects/edit/:id',
            loadComponent: () =>
              import('./features/admin/pages/project/project-editor/project-editor').then(
                (m) => m.ProjectEditor
              ),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
