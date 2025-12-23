import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { contentfulClient, getHomePageUrl } from '$lib/contentful.client';
import type { EntryGenerator } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	redirect(308, await getHomePageUrl(params.locale));
};

export const entries: EntryGenerator = async () => {
	const locales = await contentfulClient.getLocales();

	return locales.items.map((locale) => ({
		locale: locale.code,
	}));
};
