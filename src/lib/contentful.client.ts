import { createClient, type EntrySkeletonType } from 'contentful';
import { CONTENTFUL_HOST, CONTENTFUL_SPACE, CONTENTFUL_TOKEN } from '$env/static/private';
import { IContentfulEntries, type IHomePageEntry, type IHomePageFields } from '$lib/contentful';
import type { LinkablePages, Pages } from '$lib/contentful/pages';
import { error } from '@sveltejs/kit';
import type { SluggableContentTypesQueryResult } from '$lib/sanity.types';
import { sanityClient, sluggableContentTypesQuery } from '$lib/sanity.client';

export const contentfulClient = createClient({
	space: CONTENTFUL_SPACE,
	accessToken: CONTENTFUL_TOKEN,
	host: CONTENTFUL_HOST,
});

export async function getSluggableContentTypes() {
	const contentTypes = await contentfulClient.getContentTypes();
	return contentTypes.items.filter((contentType) =>
		contentType.fields.some((field) => field.id === 'slug'),
	);
}

export async function getHomePageUrl(locale: string) {
	const entry = await contentfulClient.getEntry<EntrySkeletonType<IHomePageFields>>(
		IContentfulEntries.HomePage,
		{
			locale,
		},
	);

	return `/${locale}/${entry.fields.slug}`;
}
