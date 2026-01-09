import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'projects',
    renderMode: RenderMode.Server,
  },
  {
    path: 'contact',
    renderMode: RenderMode.Server,
  },
  {
    path: 'blog',
    renderMode: RenderMode.Server,
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
