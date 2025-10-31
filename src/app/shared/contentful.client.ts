import { InjectionToken } from '@angular/core';
import { createClient } from 'contentful';

const contentDeliveryToken = 'NEhMjNQjqn3D4hg-tYn7IQqPq6RuQMtOdXcjfvTG-Vo';
const contentPreviewToken = 'kSLU97VT4-o7K8nGGHWn8jtxj_NtTSywQeFCvVW0-p0';

export const CONTENTFUL_CLIENT = new InjectionToken('CONTENTFUL_CLIENT', {
  factory: () => {
    return createClient({
      space: 'e3zlqbakza8u',
      accessToken: contentPreviewToken,
      host: 'preview.contentful.com',
    }).withoutLinkResolution;
  },
});
