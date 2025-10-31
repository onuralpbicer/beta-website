import { Route } from '@angular/router';
import { loadHeaderInformation, SupportedLocales } from './shared/loader';

function createRoutes(locale: SupportedLocales): Route[] {
  return [
    {
      path: locale.slice(0, 2),
      children: [
        {
          path: 'home',
          loadComponent: () =>
            import('./page.component').then((c) => c.PageComponent),
          resolve: {
            header: loadHeaderInformation(locale),
          },
        },
      ],
    },
  ];
}

export const appRoutes: Route[] = [
  {
    path: '**',
    redirectTo: SupportedLocales.Turkish.slice(0, 2) + '/home',
  },
  ...Object.values(SupportedLocales)
    .map((locale) => createRoutes(locale))
    .flat(),
];
