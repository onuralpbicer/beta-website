import { contentfulClient, getSluggableContentTypes } from '$lib/contentful.client';
import type { EntryGenerator } from './$types';

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
