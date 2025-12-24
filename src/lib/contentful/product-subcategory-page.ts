import type { ICategoryOrSubcategoryFields } from '$lib/contentful/shared';
import type { ExtractType, IContentfulEntry } from '$lib/contentful/helpers';
import type { IProductPageFields } from '$lib/contentful/product-page';

export interface IProductSubcategoryPageFields extends ICategoryOrSubcategoryFields<IProductPageFields> {}

export type IProductSubcategoryPageEntry = IContentfulEntry<IProductSubcategoryPageFields>;
export type IProductSubcategoryPage = ExtractType<IProductSubcategoryPageFields>;
