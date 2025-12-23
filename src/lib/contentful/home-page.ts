import type { IPageFields } from '$lib/contentful/shared';
import type { EntryFieldTypes, EntrySkeletonType } from 'contentful';
import type { ExtractType, IContentfulEntry } from '$lib/contentful/helpers';
import type { LinkablePages } from '$lib/contentful/pages';

export interface IHomePageFields extends IPageFields {
	heroTitle: EntryFieldTypes.Text;
	heroDescription: EntryFieldTypes.Text;
	heroImage: EntryFieldTypes.AssetLink;
	linkText: EntryFieldTypes.Text;
	linkTo: EntryFieldTypes.EntryLink<EntrySkeletonType<LinkablePages>>;
	// featuredItems: EntryFieldTypes.Array<
	// 	EntryFieldTypes.EntryLink<
	// 		EntrySkeletonType<IProductFields | IProductCategoryFields | IProductSubCategoryFields>
	// 	>
	// >;
	// whyUs: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType<IWhyUsFields>>>;
}

export type IHomePageEntry = IContentfulEntry<IHomePageFields>;
export type IHomePage = ExtractType<IHomePageFields>;
