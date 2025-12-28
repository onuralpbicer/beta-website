import { createClient } from '@sanity/client';
import groq from 'groq';
import type { GetHomePageQueryResult } from '$lib/sanity.types';
import { PREVIEW_TOKEN } from '$env/static/private';

export const sanityClient = createClient({
	projectId: '12mm2gbu',
	dataset: 'production',
	apiVersion: 'v2021-10-21',
	useCdn: !PREVIEW_TOKEN,
	perspective: PREVIEW_TOKEN ? 'drafts' : 'published',
	token: PREVIEW_TOKEN,
});

export async function getHomePageUrl(locale: string) {
	const res: GetHomePageQueryResult = await sanityClient.fetch(getHomePageQuery, {
		locale,
	});
	return `/${locale}/${res!.slug}`;
}

export const headerInfoQuery = groq`*[_type == "appHeader"][0]{
  logo{ asset->{ url } },
  headerLinks[]->{
    _type,
    "title": title[_key == $locale][0].value,
    "slug": slug[_key == $locale][0].value
  }
}`;

export const sluggableContentTypesQuery = groq`array::unique(
  *[
    defined(slug) &&
    count(slug) > 0
  ]._type
)`;

export const getEntryBySlugAndLocale = groq`*[
  _type in $types &&
  coalesce(slug[_key == $locale][0].value, slug[_key == $locale][0].value) == $slug
]{
  _id,
  _type,
  "title": coalesce(
    title[_key == $locale][0].value,
    title[_key == "tr"][0].value
  ),
  "metaDescription": coalesce(
    metaDescription[_key == $locale][0].value,
    metaDescription[_key == "tr"][0].value
  ),
  "slug": coalesce(
    slug[_key == $locale][0].value,
    slug[_key == "tr"][0].value
  ),
  "slugs": slug[]{
    "code": _key,
    "slug": value
  },
	// Type-specific payload
  "page": select(
    _type == "richTextPage" => {
      "content": coalesce(
        content[_key == $locale][0].value,
        content[_key == "tr"][0].value
      )
    },

    _type == "homePage" => {
      "heroTitle": coalesce(heroTitle[_key == $locale][0].value, heroTitle[_key == "tr"][0].value),
      "heroDescription": coalesce(heroDescription[_key == $locale][0].value, heroDescription[_key == "tr"][0].value),
      heroImage{ asset->{ url } },
      "linkText": coalesce(linkText[_key == $locale][0].value, linkText[_key == "tr"][0].value),
      linkTo->{
        _type,
        "slug": coalesce(slug[_key == $locale][0].value, slug[_key == "tr"][0].value),
        "title": coalesce(title[_key == $locale][0].value, title[_key == "tr"][0].value)
      },
			"featuredTitle": coalesce(featuredTitle[_key == $locale][0].value, featuredTitle[_key == "tr"][0].value),
      featured[]->{
        _type,
        "slug": coalesce(slug[_key == $locale][0].value, slug[_key == "tr"][0].value),
        "title": coalesce(title[_key == $locale][0].value, title[_key == "tr"][0].value),
        "image": select(
          defined(image) => image.asset->url,
          null
        )
      },
      "whyUsTitle": coalesce(whyUsTitle[_key == $locale][0].value, whyUsTitle[_key == "tr"][0].value),
			whyUs[]->{
        "title": coalesce(title[_key == $locale][0].value, title[_key == "tr"][0].value),
				iconName,
      },
     "keywords": string::split(
        coalesce(keywords[_key == $locale][0].value, keywords[_key == "tr"][0].value),
        ","
      )
    },

    _type == "productCategoriesPage" => {
      image{ asset->{ url } },
      products[]->{
        _type,
        "slug": coalesce(slug[_key == $locale][0].value, slug[_key == "tr"][0].value),
        "title": coalesce(title[_key == $locale][0].value, title[_key == "tr"][0].value)
      }
    },

    _type == "productSubcategoriesPage" => {
      image{ asset->{ url } },
      products[]->{
        _type,
        "slug": coalesce(slug[_key == $locale][0].value, slug[_key == "tr"][0].value),
        "title": coalesce(title[_key == $locale][0].value, title[_key == "tr"][0].value)
      }
    },

    _type == "servicesPage" => {
      products[]->{
        _type,
        "slug": coalesce(slug[_key == $locale][0].value, slug[_key == "tr"][0].value),
        "title": coalesce(title[_key == $locale][0].value, title[_key == "tr"][0].value)
      }
    },

    _type == "productPage" => {
      // add productPage fields here when you model them
    },

    // default
    {}

  )
}[0]`;

export const getHomePageQuery = groq`*[_type == 'homePage']{
  "slug": slug[_key == $locale][0].value
}[0]`;

export const getEntriesQuery = groq`*[defined(slug) && count(slug) > 0].slug[]{
  "locale": _key,
  "slug": value
}`;

export const getFooterQuery = groq`*[_type == 'footer']{
  copyright,
  footerColumns[]-> {
    "title": coalesce(title[_key == $locale][0].value, title[_key == "tr"][0].value),
    links[]-> {
      "title": coalesce(title[_key == $locale][0].value, title[_key == "tr"][0].value),
      "slug": coalesce(slug[_key == $locale][0].value, slug[_key == "tr"][0].value),
    }
  }
}[0]`;
