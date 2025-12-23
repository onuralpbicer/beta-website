import type { Entry, EntrySkeletonType, FieldsType } from 'contentful';

export type IContentfulEntry<T extends FieldsType, ID extends string = string> = Entry<
	EntrySkeletonType<T, ID>,
	'WITHOUT_UNRESOLVABLE_LINKS',
	string
>;
export type ExtractType<T extends FieldsType> = IContentfulEntry<T>['fields'];
