import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { EntryGenerator } from './$types';
import { languages } from '../../../config';
import { getHomePageUrl } from '$lib/sanity.client';

export const load: PageServerLoad = async ({ params }) => {
	redirect(308, await getHomePageUrl(params.locale));
};

export const entries: EntryGenerator = async () => {
	return languages.map((locale) => ({
		locale: locale.code,
	}));
};
