import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { type EntrySkeletonType } from 'contentful';
import { contentfulClient, getSluggableContentTypes } from '$lib/contentful.client';
import type { LinkablePages } from '$lib/contentful/pages';

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
