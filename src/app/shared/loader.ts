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
} from './contentful';

export interface IHeaderInfo extends Omit<IAppHeader, 'logo' | 'headerLinks'> {
  logo: string;
  headerLinks: IPageLink[];
}

export const loadHeaderInformation: ResolveFn<IHeaderInfo> = async () => {
  const contentfulClient = inject(CONTENTFUL_CLIENT);

  const header = await contentfulClient.getEntry<
    EntrySkeletonType<IAppHeaderFields>
  >(IContentfulEntries.AppHeader);

  const logoAsset = await contentfulClient.getAsset(header.fields.logo.sys.id);
  const headerLinks = await Promise.all(
    header.fields.headerLinks.map((link) =>
      contentfulClient.getEntry<EntrySkeletonType<IPageFields>>(link.sys.id),
    ),
  );

  return {
    ...header.fields,
    logo: logoAsset.fields.file.url,
    headerLinks: headerLinks.map((link) => link.fields),
  };
};
