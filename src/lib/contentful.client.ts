import { createClient, type EntrySkeletonType } from 'contentful';
import { CONTENTFUL_HOST, CONTENTFUL_SPACE, CONTENTFUL_TOKEN } from '$env/static/private';
import { IContentfulEntries, type IHomePageFields } from '$lib/contentful';

export const contentfulClient = createClient({
	space: CONTENTFUL_SPACE,
	accessToken: CONTENTFUL_TOKEN,
	host: CONTENTFUL_HOST,
}).withoutLinkResolution;

export async function getSluggableContentTypes() {
	const contentTypes = await contentfulClient.getContentTypes();
	return contentTypes.items.filter((contentType) =>
		contentType.fields.some((field) => field.id === 'slug'),
	);
}

export async function getHomePageUrl(locale: string) {
	const entry = await contentfulClient.getEntry<EntrySkeletonType<IHomePageFields>>(
		IContentfulEntries.HomePage,
		{
			locale,
		},
	);

	return `/${locale}/${entry.fields.slug}`;
}
