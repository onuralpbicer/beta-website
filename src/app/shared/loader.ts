import { ResolveFn } from '@angular/router';
import { inject, LOCALE_ID } from '@angular/core';
import { CONTENTFUL_CLIENT } from './contentful.client';
import { EntrySkeletonType } from 'contentful';
import {
  IAppHeader,
  IAppHeaderFields,
  IContentfulEntries,
  IHomePage,
  IHomePageFields,
  IPageFields,
  IPageLink,
  IRichTextPage,
  IRichTextPageFields,
  IWhyUs,
  IWhyUsFields
} from './contentful';

export enum SupportedLocales {
  English = 'en-US',
  Turkish = 'tr-TR',
}

export interface IHeaderInfo extends Omit<IAppHeader, 'logo' | 'headerLinks'> {
  logo: string;
  headerLinks: IPageLink[];
}

export const loadHeaderInformation: ResolveFn<IHeaderInfo> = async () => {
  const contentfulClient = inject(CONTENTFUL_CLIENT);
  const locale = inject(LOCALE_ID);

  const header = await contentfulClient.getEntry<
    EntrySkeletonType<IAppHeaderFields>
  >(IContentfulEntries.AppHeader, {
    locale,
  });

  const logoAsset = await contentfulClient.getAsset(header.fields.logo.sys.id);
  const headerLinks = await Promise.all(
    header.fields.headerLinks.map((link) =>
      contentfulClient.getEntry<EntrySkeletonType<IPageFields>>(link.sys.id, {
        locale,
      }),
    ),
  );

  return {
    ...header.fields,
    logo: logoAsset.fields.file.url,
    headerLinks: headerLinks.map((link) => link.fields),
  };
};

export const loadRichTextPageInformation =
  (id: string): ResolveFn<IRichTextPage> =>
  async () => {
    const contentfulClient = inject(CONTENTFUL_CLIENT);

    const about = await contentfulClient.getEntry<
      EntrySkeletonType<IRichTextPageFields>
    >(id, {
      locale: inject(LOCALE_ID),
    });

    return about.fields;
  };

export interface IHomePageInfo extends Omit<IHomePage, 'heroImage' | 'whyUs'> {
  heroImage: string;
  whyUs: IWhyUs[];
}

export const loadHomePage: ResolveFn<IHomePageInfo> = async () => {
  const contentfulClient = inject(CONTENTFUL_CLIENT);
  const locale = inject(LOCALE_ID);

  const home = await contentfulClient.getEntry<
    EntrySkeletonType<IHomePageFields>
  >(IContentfulEntries.Home, {
    locale,
  });

  const heroImage = await contentfulClient.getAsset(
    home.fields.heroImage.sys.id,
    {
      locale,
    },
  );

  const whyUs = await Promise.all(
    home.fields.whyUs.map((entry) =>
      contentfulClient.getEntry<EntrySkeletonType<IWhyUsFields>>(entry.sys.id, {
        locale,
      }),
    ),
  );

  return {
    ...home.fields,
    heroImage: heroImage.fields.file.url,
    whyUs: whyUs.map((entry) => entry.fields),
  };
};
