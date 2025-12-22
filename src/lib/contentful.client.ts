import { createClient } from 'contentful';
import { CONTENTFUL_HOST, CONTENTFUL_SPACE, CONTENTFUL_TOKEN } from '$env/static/private';

export const contentfulClient = createClient({
	space: CONTENTFUL_SPACE,
	accessToken: CONTENTFUL_TOKEN,
	host: CONTENTFUL_HOST
}).withoutLinkResolution;
