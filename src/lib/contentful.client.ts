import { createClient, type EntrySkeletonType } from 'contentful';
import { CONTENTFUL_HOST, CONTENTFUL_SPACE, CONTENTFUL_TOKEN } from '$env/static/private';
import { IContentfulEntries, type IHomePageEntry, type IHomePageFields } from '$lib/contentful';
import type { LinkablePages, Pages } from '$lib/contentful/pages';
import { error } from '@sveltejs/kit';

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

export async function getEntry(locale: string, slug: string) {
	const sluggableContentTypes = await getSluggableContentTypes();

	const res = await Promise.all(
		sluggableContentTypes.map(async (contentType) => {
			const res = await contentfulClient.getEntries<EntrySkeletonType<Pages>>({
				content_type: contentType.sys.id,
				'fields.slug': slug,
				limit: 1,
				locale: locale,
			});

			return res.items;
		}),
	);

	const results = res.flat();

	const entry = results[0];
	if (!entry) {
		throw error(404);
	}

	if (results.length > 1) {
		throw error(500, {
			message: 'Found multiple matches',
		});
	}

	return entry;
}
