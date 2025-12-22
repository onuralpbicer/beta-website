import type { EntryFieldTypes, EntrySkeletonType } from 'contentful';
import type { ExtractType, IContentfulEntry } from '$lib/contentful/helpers';
import type { LinkablePages } from '$lib/contentful/pages';

export interface IAppHeaderFields {
	title: EntryFieldTypes.Text;
	headerLinks: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType<LinkablePages>>>;
	logo: EntryFieldTypes.AssetLink;
}

export type IAppHeaderEntry = IContentfulEntry<IAppHeaderFields>;
export type IAppHeader = ExtractType<IAppHeaderFields>;
