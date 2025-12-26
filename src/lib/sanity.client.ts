import { createClient } from '@sanity/client';

export const sanityClient = createClient({
	projectId: '12mm2gbu',
	dataset: 'production',
	useCdn: true,
});
