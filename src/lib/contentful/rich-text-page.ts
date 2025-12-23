import type { IPageFields } from '$lib/contentful/shared';
import type { EntryFieldTypes } from 'contentful';
import type { ExtractType, IContentfulEntry } from '$lib/contentful/helpers';

export interface IRichTextPageFields extends IPageFields {
	content: EntryFieldTypes.RichText;
}

export type IRichTextPageEntry = IContentfulEntry<IRichTextPageFields>;
export type IRichTextPage = ExtractType<IRichTextPageFields>;
