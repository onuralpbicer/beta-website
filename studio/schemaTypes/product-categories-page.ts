import {defineField, defineType} from 'sanity'
import {pageFields} from './shared'

export default defineType({
  name: 'productCategoriesPage',
  title: 'Ürün Kategorisi Sayfası',
  type: 'document',
  fields: [
    ...pageFields,
    defineField({
      name: 'image',
      type: 'image',
      title: 'Görsel',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'products',
      title: 'Ürün alt kategorileri veya ürünler',
      type: 'array',
      of: [
        defineField({
          type: 'reference',
          name: 'products',
          to: [{type: 'productPage'}],
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
})
