import type { EntryGenerator } from './$types';
import { getEntriesQuery, sanityClient } from '$lib/sanity.client';
import type { GetEntriesQueryResult } from '$lib/sanity.types';

export const entries: EntryGenerator = async () => {
	const res: GetEntriesQueryResult = await sanityClient.fetch(getEntriesQuery);

	return res
		.filter((result) => !!result?.slug)
		.map((page) => ({ locale: page!.locale, slug: page!.slug! }));
};

export const prerender = true;
