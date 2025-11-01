import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'en-US/about-us', renderMode: RenderMode.Prerender },
  { path: 'en-US/contact-us', renderMode: RenderMode.Prerender },
  { path: 'en-US/home', renderMode: RenderMode.Prerender },
  { path: 'tr-TR/hakkimizda', renderMode: RenderMode.Prerender },
  { path: 'tr-TR/home', renderMode: RenderMode.Prerender },
  { path: 'tr-TR/iletisim', renderMode: RenderMode.Prerender },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    getPrerenderParams: async () => {
      return [];
    },
  },
];
