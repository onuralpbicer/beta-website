import { redirect } from '@sveltejs/kit';
import { getHomePageUrl } from '$lib/contentful.client';

export const load = async () => {
	redirect(308, await getHomePageUrl('tr'));
};
