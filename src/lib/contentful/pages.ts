import type { IRichTextPageFields } from '$lib/contentful/rich-text-page';
import type { IHomePageFields } from '$lib/contentful/home-page';

export type Pages = IHomePageFields | IRichTextPageFields;

export type LinkablePages = Exclude<Pages, IHomePageFields>;
