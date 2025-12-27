import { createClient } from '@sanity/client';
import groq from 'groq';

export const sanityClient = createClient({
	projectId: '12mm2gbu',
	dataset: 'production',
	useCdn: true,
});

export const headerInfoQuery = groq`*[_type == "appHeader"][0]{
  logo{ asset->{ url } },
  headerLinks[]->{
    _type,
    "title": title[_key == $locale][0].value,
    "slug": slug[_key == $locale][0].value
  }
}`;
