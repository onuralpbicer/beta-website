import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getHomePageUrl } from '$lib/contentful.client';
import type { EntryGenerator } from './$types';
import { languages } from '../../../config';

export const load: PageServerLoad = async ({ params }) => {
	redirect(308, await getHomePageUrl(params.locale));
};

export const entries: EntryGenerator = async () => {
	return languages.map((locale) => ({
		locale: locale.code,
	}));
};
