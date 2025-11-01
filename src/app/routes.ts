import { SupportedLocales } from './shared/loader';

export const paths = {
  about: {
    [SupportedLocales.Turkish]: 'hakkimizda',
    [SupportedLocales.English]: 'about-us',
  },
  contact: {
    [SupportedLocales.Turkish]: 'iletisim',
    [SupportedLocales.English]: 'contact-us',
  },
} satisfies Record<string, Record<SupportedLocales, string>>;
