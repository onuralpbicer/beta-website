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
      }
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
