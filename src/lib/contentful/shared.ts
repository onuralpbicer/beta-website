import type { EntryFieldTypes, EntrySkeletonType, FieldsType } from 'contentful';
import type { ExtractType, IContentfulEntry } from '$lib/contentful/helpers';

export interface IPageFields {
	title: EntryFieldTypes.Text;
	metaDescription?: EntryFieldTypes.Text;
	slug: EntryFieldTypes.Text;
}

export type IPageEntry = IContentfulEntry<IPageFields>;
export type IPage = ExtractType<IPageFields>;

export interface ICategoryOrSubcategoryFields<T extends FieldsType> extends IPageFields {
	image: EntryFieldTypes.AssetLink;
	products: EntryFieldTypes.EntryLink<EntrySkeletonType<T>>;
}
