import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  DomSanitizer,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { SupportedLocales } from './shared/loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideAppInitializer(async () => {
      const icons: MatIconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);

      Object.values(SupportedLocales).forEach((locale) => {
        icons.addSvgIcon(
          locale,
          sanitizer.bypassSecurityTrustResourceUrl(
            `/assets/flags/${locale}.svg`,
          ),
        );
      });
    }),
  ],
};
