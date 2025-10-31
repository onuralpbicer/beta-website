import {
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  FieldsType,
} from 'contentful';

export enum IContentfulEntries {
  AppHeader = '3bziQUv9Neq4sLT584yRh3',
}

export enum IContentfulEnvs {
  staging = 'staging',
  master = 'master',
}

export type IContentfulEntry<
  T extends FieldsType,
  ID extends string = string,
> = Entry<EntrySkeletonType<T, ID>, 'WITHOUT_LINK_RESOLUTION', string>;
type ExtractType<T extends FieldsType> = IContentfulEntry<T>['fields'];

export interface IProductFields {
  name: EntryFieldTypes.Text;
}

export type IProductEntry = IContentfulEntry<IProductFields>;
export type IProduct = ExtractType<IProductFields>;

export interface IProductCategoryFields {
  name: EntryFieldTypes.Text;
  products: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType<IProductFields>>
  >;
}

export type IProductCategoryEntry = IContentfulEntry<IProductCategoryFields>;
export type IProductCategory = ExtractType<IProductCategoryFields>;

export interface IPageFields {
  title: EntryFieldTypes.Text;
  url: EntryFieldTypes.Text;
}

export type IPageLink = ExtractType<IPageFields>;

export interface IProductPageFields extends IPageFields {
  products: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType<IProductCategoryFields>>
  >;
}

export type IProductPageEntry = IContentfulEntry<IProductPageFields>;
export type IProductPage = ExtractType<IProductPageFields>;

export interface IRichTextPageFields extends IPageFields {
  content: EntryFieldTypes.RichText;
}

export type IRichTextPageEntry = IContentfulEntry<IRichTextPageFields>;
export type IRichTextPage = ExtractType<IRichTextPageFields>;

export interface IAppHeaderFields {
  title: EntryFieldTypes.Text;
  headerLinks: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType<IPageFields>>
  >;
  logo: EntryFieldTypes.AssetLink;
}

export type IAppHeaderEntry = IContentfulEntry<IAppHeaderFields>;
export type IAppHeader = ExtractType<IAppHeaderFields>;

export interface IFooterColumnFields {
  title: EntryFieldTypes.Text;
  links: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType<IPageFields>>
  >;
}

export type IFooterColumnEntry = IContentfulEntry<IFooterColumnFields>;
export type IFooterColumn = ExtractType<IFooterColumnFields>;

export interface IFooterFields {
  title: EntryFieldTypes.Text;
  copyright: EntryFieldTypes.Text;
  footerColumns: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType<IFooterColumnFields>>
  >;
}

export type IFooterEntry = IContentfulEntry<IFooterFields>;
export type IFooter = ExtractType<IFooterFields>;
