import type { ExtractType, IContentfulEntry } from '$lib/contentful/helpers';
import type { ICategoryOrSubcategoryFields } from '$lib/contentful/shared';
import type { IProductSubcategoryPageFields } from '$lib/contentful/product-subcategory-page';
import type { IProductPageFields } from '$lib/contentful/product-page';

export interface IProductCategoryPageFields extends ICategoryOrSubcategoryFields<
	IProductSubcategoryPageFields | IProductPageFields
> {}

export type IProductCategoryPageEntry = IContentfulEntry<IProductCategoryPageFields>;
export type IProductCategoryPage = ExtractType<IProductCategoryPageFields>;
