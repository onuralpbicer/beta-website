import type { GetEntryBySlugAndLocaleResult, GetServicesQueryResult } from '$lib/sanity.types';

export type IRichTextPage = Extract<
	NonNullable<GetEntryBySlugAndLocaleResult>,
	{ _type: 'richTextPage' }
>;

export type IHomePage = Extract<NonNullable<GetEntryBySlugAndLocaleResult>, { _type: 'homePage' }>;

export type FeaturedCard = NonNullable<IHomePage['page']['featured']>[0];
export type WhyUs = NonNullable<IHomePage['page']['whyUs']>[0];

export type IServicesPage = Extract<
	NonNullable<GetEntryBySlugAndLocaleResult>,
	{ _type: 'servicesPage' }
>;

export type IProductCategoryPage = Extract<
	NonNullable<GetEntryBySlugAndLocaleResult>,
	{ _type: 'productCategoriesPage' }
>;

export type IProductSubCategoryPage = Extract<
	NonNullable<GetEntryBySlugAndLocaleResult>,
	{ _type: 'productSubcategoriesPage' }
>;

export type IProductPage = Extract<
	NonNullable<GetEntryBySlugAndLocaleResult>,
	{ _type: 'productPage' }
>;

export type IProductListPage = IServicesPage | IProductCategoryPage | IProductSubCategoryPage;

type ISidebarProductsItem = NonNullable<NonNullable<GetServicesQueryResult>['products']>[number];
export type ISidebarProductCategory = Extract<
	ISidebarProductsItem,
	{ _type: 'productCategoriesPage' }
>;
export type ISidebarProduct = Extract<ISidebarProductsItem, { _type: 'productPage' }>;
export type ISidebarProductSubCategory = Extract<
	ISidebarProductsItem,
	{ _type: 'productSubcategoriesPage' }
>;
