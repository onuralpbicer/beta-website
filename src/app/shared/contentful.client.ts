import { InjectionToken } from '@angular/core';
import { createClient } from 'contentful';
import { IContentfulEnvs } from './contentful';

export const CONTENTFUL_CLIENT = new InjectionToken('CONTENTFUL_CLIENT', {
  factory: () => {
    return createClient({
      space: 'v00lofp5qjmx',
      accessToken: 'kje-KuyQeFghMLLUVot_f6tClX-mv717r6GCYj34VRU',
      environment: IContentfulEnvs.master,
      host: 'preview.contentful.com',
    }).withoutLinkResolution;
  },
});
