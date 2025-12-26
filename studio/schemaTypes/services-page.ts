import {defineType, defineField} from 'sanity'
import {pageFields, pagePreview} from './shared'

export default defineType({
  name: 'servicesPage',
  title: 'Hizmetler Sayfası',
  description: 'Bundan sadece bir tane yaratin!!!',
  type: 'document',
  preview: pagePreview,
  fields: [
    ...pageFields,

    defineField({
      name: 'products',
      title: 'Ürün kategorileri, alt kategorileri veya ürünler',
      type: 'array',
      of: [
        defineField({
          type: 'reference',
          name: 'products',
          to: [
            {type: 'productCategoriesPage'},
            {type: 'productSubcategoriesPage'},
            {type: 'productPage'},
          ],
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
})
