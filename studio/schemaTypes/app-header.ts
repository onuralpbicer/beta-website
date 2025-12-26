import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'appHeader',
  title: 'Uygulama Başlığı',
  description: 'Bundan sadece bir tane yaratin!!!',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headerLinks',
      type: 'array',
      of: [
        defineField({
          type: 'reference',
          name: 'headerLinks',
          to: [
            {type: 'richTextPage'},
            {type: 'servicesPage'},
            {type: 'productCategoriesPage'},
            {type: 'productSubcategoriesPage'},
            {type: 'productPage'},
          ],
        }),
      ],
    }),
  ],
})
