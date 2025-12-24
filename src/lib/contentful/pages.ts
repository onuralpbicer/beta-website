import type { IRichTextPageFields } from '$lib/contentful/rich-text-page';
import type { IHomePageFields } from '$lib/contentful/home-page';
import type { IProductCategoryPageFields } from '$lib/contentful/product-category-page';
import type { IProductSubcategoryPageFields } from '$lib/contentful/product-subcategory-page';
import type { IProductPageFields } from '$lib/contentful/product-page';
import type { IServicesPageFields } from '$lib/contentful/services-page';

export type CommonProductPages =
	| IProductCategoryPageFields
	| IProductSubcategoryPageFields
	| IProductPageFields;

export type Pages =
	| IHomePageFields
	| IRichTextPageFields
	| CommonProductPages
	| IServicesPageFields;

export type LinkablePages = Exclude<Pages, IHomePageFields>;
