import type { LayoutServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { contentfulClient } from '$lib/contentful.client';
import type { EntrySkeletonType } from 'contentful';
import { type IAppHeaderFields, IContentfulEntries, type IPageFields } from '$lib/contentful';
import type { IHeaderInfo } from '$lib/model';

export const load: LayoutServerLoad = async ({ params }): Promise<{ header: IHeaderInfo }> => {
	const locale = params.locale;

	if (!['en-AU', 'tr-TR'].includes(locale)) {
		return error(404);
	}

	const header = await contentfulClient.getEntry<EntrySkeletonType<IAppHeaderFields>>(
		IContentfulEntries.AppHeader,
		{
			locale
		}
	);

	const logoAsset = await contentfulClient.getAsset(header.fields.logo.sys.id);
	const headerLinks = await Promise.all(
		header.fields.headerLinks.map((link) =>
			contentfulClient.getEntry<EntrySkeletonType<IPageFields>>(link.sys.id, {
				locale
			})
		)
	);

	return {
		header: {
			...header.fields,
			logo: logoAsset.fields.file!.url ?? '',
			headerLinks: headerLinks.map((link) => link.fields)
		}
	};
};
