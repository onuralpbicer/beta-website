import { Route } from '@angular/router';
import {
  loadHeaderInformation,
  loadRichTextPageInformation,
  SupportedLocales,
} from './shared/loader';
import { IContentfulEntries } from './shared/contentful';

const paths = {
  about: {
    [SupportedLocales.Turkish]: 'hakkimizda',
    [SupportedLocales.English]: 'about-us',
  },
  contact: {
    [SupportedLocales.Turkish]: 'iletisim',
    [SupportedLocales.English]: 'contact-us',
  },
} satisfies Record<string, Record<SupportedLocales, string>>;

function createRoutes(locale: SupportedLocales): Route[] {
  const richTextPages = [
    {
      path: paths.about[locale],
      entry: IContentfulEntries.AboutUs,
    },
    {
      path: paths.contact[locale],
      entry: IContentfulEntries.ContactUs,
    },
  ];

  return [
    {
      path: locale,
      loadComponent: () =>
        import('./page.component').then((c) => c.PageComponent),
      resolve: {
        header: loadHeaderInformation(locale),
      },
      children: [
        {
          path: 'home',
          loadComponent: () =>
            import('./home-page.component').then((c) => c.HomePageComponent),
        },
        ...richTextPages.map(({ path, entry }) => ({
          path,
          loadComponent: () =>
            import('./rich-text-page.component').then(
              (c) => c.RichTextPageComponent,
            ),
          resolve: {
            richText: loadRichTextPageInformation(locale, entry),
          },
        })),
        {
          path: '**',
          redirectTo: 'home',
        },
      ],
    },
  ];
}

export const appRoutes: Route[] = [
  ...Object.values(SupportedLocales)
    .map((locale) => createRoutes(locale))
    .flat(),
  {
    path: '**',
    redirectTo: SupportedLocales.Turkish + '/home',
  },
];
