import type { LayoutServerLoad } from './$types';
import { contentfulClient, getEntry, getHomePageUrl } from '$lib/contentful.client';
import type { EntrySkeletonType } from 'contentful';
import { type IAppHeaderFields, IContentfulEntries } from '$lib/contentful';
import type { LinkablePages } from '$lib/contentful/pages';
import { redirect } from '@sveltejs/kit';

const hrefLangs: Record<string, string> = {
	en: 'en-US',
	tr: 'tr-TR',
};

export const load: LayoutServerLoad = async ({ params }) => {
	const allowedLocales = await contentfulClient.getLocales();

	if (!allowedLocales.items.map((l) => l.code).includes(params.locale)) {
		redirect(308, await getHomePageUrl('tr'));
	}

	let alternateTranslations = allowedLocales.items.map((locale) => ({
		name: locale.name,
		code: locale.code,
		href: locale.code,
		hreflang: hrefLangs[locale.code] ?? locale.code,
	}));
	let entry = null;

	if (params.slug) {
		entry = await getEntry(params.locale, params.slug);

		const multiLocaleEntry = await contentfulClient.withAllLocales.getEntry<
			EntrySkeletonType<LinkablePages>
		>(entry.sys.id);

		const localeMap = Object.fromEntries(
			allowedLocales.items.map((locale) => [locale.code, locale.name]),
		);

		alternateTranslations = Object.entries(multiLocaleEntry.fields.slug).map(([key, value]) => ({
			code: key,
			href: value ?? key,
			name: localeMap[key] ?? key,
			hreflang: hrefLangs[key] ?? key,
		}));
	}

	return {
		header: await loadHeaderInfo(params.locale),
		alternateTranslations,
		entry,
	};
};

async function loadHeaderInfo(locale: string) {
	const header = await contentfulClient.getEntry<EntrySkeletonType<IAppHeaderFields>>(
		IContentfulEntries.AppHeader,
		{
			locale: locale,
		},
	);

	const logoAsset = await contentfulClient.getAsset(header.fields.logo.sys.id);
	const headerLinks = await Promise.all(
		header.fields.headerLinks.map((link) =>
			contentfulClient.getEntry<EntrySkeletonType<LinkablePages>>(link.sys.id, {
				locale: locale,
			}),
		),
	);

	return {
		...header.fields,
		logo: logoAsset.fields.file!.url ?? '',
		headerLinks: headerLinks.map((link) => link.fields),
	};
}
