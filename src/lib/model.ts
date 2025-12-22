import type { IAppHeader, IPageLink } from '$lib/contentful';

export interface IHeaderInfo extends Omit<IAppHeader, 'logo' | 'headerLinks'> {
	logo: string;
	headerLinks: IPageLink[];
}
