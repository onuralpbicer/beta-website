import { redirect } from '@sveltejs/kit';
import { getHomePageUrl } from '$lib/contentful.client';
import { contentfulClient, getSluggableContentTypes } from '$lib/contentful.client';
import type { EntryGenerator } from './$types';

export const load = async () => {
	redirect(308, await getHomePageUrl('tr'));
};

// idk why this doesn't work, but it's a better approach than what I already implemented
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

	console.log([
		...entries
			.flat()
			.filter((entry) => entry.entry.fields['slug'])
			.map((entry) => `/${entry.locale}/${entry.entry.fields['slug']}`),
		'/',
		'/en',
		'/tr',
	]);
	return [
		...entries
			.flat()
			.filter((entry) => entry.entry.fields['slug'])
			.map((entry) => `/${entry.locale}/${entry.entry.fields['slug']}`),
		'/',
		'/en',
		'/tr',
	];
};
