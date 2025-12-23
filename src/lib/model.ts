import type { IAppHeader } from '$lib/contentful';
import type { ExtractType } from '$lib/contentful/helpers';
import type { LinkablePages } from '$lib/contentful/pages';

export interface IHeaderInfo extends Omit<IAppHeader, 'logo' | 'headerLinks'> {
	logo: string;
	headerLinks: ExtractType<LinkablePages>[];
}

export interface AlternateTranslation {
	code: string;
	href: string;
	name: string;
	hreflang: string;
}
