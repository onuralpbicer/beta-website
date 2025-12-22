import type { EntryFieldTypes } from 'contentful';
import type { ExtractType, IContentfulEntry } from '$lib/contentful/helpers';

export interface IPageFields {
	title: EntryFieldTypes.Text;
	metaDescription?: EntryFieldTypes.Text;
	slug: EntryFieldTypes.Text;
}

export type IPageEntry = IContentfulEntry<IPageFields>;
export type IPage = ExtractType<IPageFields>;
