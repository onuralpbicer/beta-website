import type { GetEntryBySlugAndLocaleResult } from '$lib/sanity.types';

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

export type ProductCategoryCard = Extract<
	NonNullable<IServicesPage['page']['products']>[number],
	{ _type: 'productCategoriesPage' }
>;
