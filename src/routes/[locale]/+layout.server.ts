import type { LayoutServerLoad } from './$types';
import { contentfulClient, getHomePageUrl } from '$lib/contentful.client';
import type { EntrySkeletonType } from 'contentful';
import { type IAppHeaderFields, IContentfulEntries } from '$lib/contentful';
import type { IHeaderInfo } from '$lib/model';
import type { LinkablePages } from '$lib/contentful/pages';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params }): Promise<{ header: IHeaderInfo }> => {
	const allowedLocales = await contentfulClient.getLocales();

	if (!allowedLocales.items.map((l) => l.code).includes(params.locale)) {
		redirect(308, await getHomePageUrl('tr'));
	}

	const header = await contentfulClient.getEntry<EntrySkeletonType<IAppHeaderFields>>(
		IContentfulEntries.AppHeader,
		{
			locale: params.locale,
		},
	);

	const logoAsset = await contentfulClient.getAsset(header.fields.logo.sys.id);
	const headerLinks = await Promise.all(
		header.fields.headerLinks.map((link) =>
			contentfulClient.getEntry<EntrySkeletonType<LinkablePages>>(link.sys.id, {
				locale: params.locale,
			}),
		),
	);

	return {
		header: {
			...header.fields,
			logo: logoAsset.fields.file!.url ?? '',
			headerLinks: headerLinks.map((link) => link.fields),
		},
	};
};
