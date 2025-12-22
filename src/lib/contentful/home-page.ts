import type { IPageFields } from '$lib/contentful/shared';
import type { EntryFieldTypes } from 'contentful';
import type { ExtractType, IContentfulEntry } from '$lib/contentful/helpers';

export interface IHomePageFields extends IPageFields {
	heroTitle: EntryFieldTypes.Text;
	heroDescription: EntryFieldTypes.Text;
	heroImage: EntryFieldTypes.AssetLink;
	// featuredItems: EntryFieldTypes.Array<
	// 	EntryFieldTypes.EntryLink<
	// 		EntrySkeletonType<IProductFields | IProductCategoryFields | IProductSubCategoryFields>
	// 	>
	// >;
	// whyUs: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType<IWhyUsFields>>>;
}

export type IHomePageEntry = IContentfulEntry<IHomePageFields>;
export type IHomePage = ExtractType<IHomePageFields>;
