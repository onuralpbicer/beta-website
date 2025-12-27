import type { BlockContent, GetEntryBySlugAndLocaleResult, RichTextPage } from '$lib/sanity.types';

type QueriedInternalFields = '_id' | '_type';
type OtherInternalFields = '_createdAt' | '_updatedAt' | '_rev';

type InternalFields = QueriedInternalFields | OtherInternalFields;

type CommonPageFields = 'title' | 'metaDescription' | 'slug';

export type IRichTextPage = Extract<
	NonNullable<GetEntryBySlugAndLocaleResult>,
	{ _type: 'richTextPage' }
>;

export type IHomePage = Extract<NonNullable<GetEntryBySlugAndLocaleResult>, { _type: 'homePage' }>;
