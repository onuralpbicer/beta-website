import { Route } from '@angular/router';
import { loadHeaderInformation } from './shared/loader';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./page.component').then((c) => c.PageComponent),
    resolve: {
      header: loadHeaderInformation,
    },
  },
];
