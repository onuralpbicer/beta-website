import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { SupportedLocales } from './shared/loader';
import { paths } from './routes';

export const serverRoutes: ServerRoute[] = [
  ...Object.values(SupportedLocales)
    .map((locale): ServerRoute[] => [
      {
        path: locale + `/${paths.about[locale]}`,
        renderMode: RenderMode.Prerender,
      },
      {
        path: locale + `/${paths.contact[locale]}`,
        renderMode: RenderMode.Prerender,
      },
      {
        path: locale + `/home`,
        renderMode: RenderMode.Prerender,
      },
    ])
    .flat(),
  {
    path: '**',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    getPrerenderParams: async () => {
      return [];
    },
  },
];
