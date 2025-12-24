import type { ICategoryOrSubcategoryFields } from '$lib/contentful/shared';
import type { IProductSubcategoryPageFields } from '$lib/contentful/product-subcategory-page';
import type { IProductPageFields } from '$lib/contentful/product-page';
import type { ExtractType, IContentfulEntry } from '$lib/contentful/helpers';
import type { IProductCategoryPageFields } from '$lib/contentful/product-category-page';

export interface IServicesPageFields extends Omit<
	ICategoryOrSubcategoryFields<
		IProductCategoryPageFields | IProductSubcategoryPageFields | IProductPageFields
	>,
	'image'
> {}

export type IServicesPageEntry = IContentfulEntry<IServicesPageFields>;
export type IServicesPage = ExtractType<IServicesPageFields>;
