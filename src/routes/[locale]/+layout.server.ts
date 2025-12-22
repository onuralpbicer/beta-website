import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { contentfulClient } from '$lib/contentful.client';
import type { EntrySkeletonType } from 'contentful';
import { type IAppHeaderFields, IContentfulEntries, type IPageFields } from '$lib/contentful';
import type { IHeaderInfo } from '$lib/model';

export const load: LayoutServerLoad = async ({ params }): Promise<{ header: IHeaderInfo }> => {
	if (!['en-AU', 'tr-TR'].includes(params.locale)) {
		return redirect(308, '/tr-TR/home');
	}

	const header = await contentfulClient.getEntry<EntrySkeletonType<IAppHeaderFields>>(
		IContentfulEntries.AppHeader,
		{
			locale: params.locale
		}
	);

	const logoAsset = await contentfulClient.getAsset(header.fields.logo.sys.id);
	const headerLinks = await Promise.all(
		header.fields.headerLinks.map((link) =>
			contentfulClient.getEntry<EntrySkeletonType<IPageFields>>(link.sys.id, {
				locale: params.locale
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
