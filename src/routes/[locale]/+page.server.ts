import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getHomePageUrl } from '$lib/contentful.client';

export const load: PageServerLoad = async ({ params }) => {
	redirect(308, await getHomePageUrl(params.locale));
};
