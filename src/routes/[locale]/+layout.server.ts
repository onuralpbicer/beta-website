import type { LayoutServerLoad } from './$types';
import { getHomePageUrl } from '$lib/contentful.client';
import { error, redirect } from '@sveltejs/kit';
import { languages } from '../../../config';
import {
	getEntryBySlugAndLocale,
	headerInfoQuery,
	sanityClient,
	sluggableContentTypesQuery,
} from '$lib/sanity.client';
import type {
	GetEntryBySlugAndLocaleResult,
	HeaderInfoQueryResult,
	SluggableContentTypesQueryResult,
} from '$lib/sanity.types';

const hrefLangs: Record<string, string> = {
	en: 'en-US',
	tr: 'tr-TR',
};

export const load: LayoutServerLoad = async ({ params }) => {
	if (!languages.map((l) => l.code).includes(params.locale)) {
		redirect(308, await getHomePageUrl('tr'));
	}

	let alternateTranslations = languages.map((locale) => ({
		name: locale.title,
		code: locale.code,
		href: locale.code,
		hreflang: hrefLangs[locale.code] ?? locale.code,
	}));
	let entry: GetEntryBySlugAndLocaleResult = null;

	if (params.slug) {
		const contentTypes: SluggableContentTypesQueryResult = await sanityClient.fetch(
			sluggableContentTypesQuery,
		);

		entry = await sanityClient.fetch(getEntryBySlugAndLocale, {
			types: contentTypes,
			locale: params.locale,
			slug: params.slug,
		});

		if (!entry) {
			throw error(404);
		}

		const localeMap = Object.fromEntries(languages.map((locale) => [locale.code, locale.title]));

		alternateTranslations = (entry.slugs ?? []).map(({ code, slug }) => ({
			code,
			href: slug!,
			name: localeMap[code] ?? code,
			hreflang: hrefLangs[code] ?? code,
		}));
	}

	return {
		header: await loadHeaderInfo(params.locale),
		alternateTranslations,
		entry,
	};
};

async function loadHeaderInfo(locale: string) {
	const sanityHeader: HeaderInfoQueryResult = await sanityClient.fetch(headerInfoQuery, {
		locale,
	});

	return sanityHeader;
}
