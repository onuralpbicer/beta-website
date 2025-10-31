import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: ':locale',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return ['en', 'tr'].map((locale) => ({ locale }));
    },
  },
];
