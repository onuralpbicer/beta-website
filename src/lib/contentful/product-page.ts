import type { IPageFields } from '$lib/contentful/shared';
import type { ExtractType, IContentfulEntry } from '$lib/contentful/helpers';

export interface IProductPageFields extends IPageFields {
	// todo
}

export type IProductPageEntry = IContentfulEntry<IProductPageFields>;
export type IProductPage = ExtractType<IProductPageFields>;
