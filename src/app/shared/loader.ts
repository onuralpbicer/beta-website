import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CONTENTFUL_CLIENT } from './contentful.client';
import { EntrySkeletonType } from 'contentful';
import {
  IAppHeader,
  IAppHeaderFields,
  IContentfulEntries,
  IPageFields,
  IPageLink,
  IRichTextPage,
  IRichTextPageFields,
} from './contentful';

type LocaleResolver<T> = (locale: SupportedLocales) => ResolveFn<T>;

export enum SupportedLocales {
  English = 'en-US',
  Turkish = 'tr-TR',
}

export interface IHeaderInfo extends Omit<IAppHeader, 'logo' | 'headerLinks'> {
  logo: string;
  headerLinks: IPageLink[];
}

export const loadHeaderInformation: LocaleResolver<IHeaderInfo> =
  (locale) => async () => {
    const contentfulClient = inject(CONTENTFUL_CLIENT);

    const header = await contentfulClient.getEntry<
      EntrySkeletonType<IAppHeaderFields>
    >(IContentfulEntries.AppHeader, {
      locale,
    });

    const logoAsset = await contentfulClient.getAsset(
      header.fields.logo.sys.id,
    );
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
  (locale: SupportedLocales, id: string): ResolveFn<IRichTextPage> =>
  async () => {
    const contentfulClient = inject(CONTENTFUL_CLIENT);

    const about = await contentfulClient.getEntry<
      EntrySkeletonType<IRichTextPageFields>
    >(id, {
      locale,
    });

    return about.fields;
  };
