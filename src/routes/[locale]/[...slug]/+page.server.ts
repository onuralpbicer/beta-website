import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { type EntrySkeletonType } from 'contentful';
import type { LinkablePages } from '$lib/contentful/pages';
import { contentfulClient, getSluggableContentTypes } from '$lib/contentful.client';
import type { EntryGenerator } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const sluggableContentTypes = await getSluggableContentTypes();

	const res = await Promise.all(
		sluggableContentTypes.map(async (contentType) => {
			const res = await contentfulClient.getEntries<EntrySkeletonType<LinkablePages>>({
				content_type: contentType.sys.id,
				'fields.slug': params.slug,
				limit: 1,
				locale: params.locale,
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
};

export const entries: EntryGenerator = async () => {
	const sluggableContentTypes = await getSluggableContentTypes();
	const locales = await contentfulClient.getLocales();

	const entries = [];

	for (const contentType of sluggableContentTypes) {
		const entriesList = await Promise.all(
			locales.items.map(async (locale) => {
				const entries = await contentfulClient.getEntries({
					locale: locale.code,
					content_type: contentType.sys.id,
				});

				return entries.items.map((entry) => ({
					entry: entry,
					locale: locale.code,
				}));
			}),
		);

		entries.push(entriesList.flat());
	}

	return [
		...entries
			.flat()
			.filter((entry) => entry.entry.fields['slug'])
			.map((entry) => ({
				locale: entry.locale,
				slug: entry.entry.fields['slug'] as string,
			})),
	];
};

export const prerender = true;
