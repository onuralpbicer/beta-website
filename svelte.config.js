import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createClient } from 'contentful';

export const contentfulClient = createClient({
	space: process.env['CONTENTFUL_SPACE'],
	accessToken: process.env['CONTENTFUL_TOKEN'],
	host: process.env['CONTENTFUL_HOST'],
}).withoutLinkResolution;

async function getSluggableContentTypes() {
	const contentTypes = await contentfulClient.getContentTypes();
	return contentTypes.items.filter((contentType) =>
		contentType.fields.some((field) => field.id === 'slug'),
	);
}

const sluggableContentTypes = await getSluggableContentTypes();
const locales = await contentfulClient.getLocales();

const entries = [];

for (const contentType of sluggableContentTypes) {
	const entriesList = await Promise.all(
		locales.items.map(async (locale) => {
			const entries = await contentfulClient.getEntries({
				locale: locale.code,
				content_type: contentType.sys.id,
			});

			return entries.items.map((entry) => ({
				entry: entry,
				locale: locale.code,
			}));
		}),
	);

	entries.push(entriesList.flat());
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true,
		}),
		prerender: {
			handleHttpError: 'warn',
			entries: [
				...entries
					.flat()
					.filter((entry) => entry.entry.fields['slug'])
					.map((entry) => `/${entry.locale}/${entry.entry.fields['slug']}`),
				'/',
				'/en',
				'/tr',
			],
		},
	},
};

export default config;
