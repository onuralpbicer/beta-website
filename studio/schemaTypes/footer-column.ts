import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'footerColumn',
  title: 'Altbilgi Sütunu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'İsim',
      type: 'internationalizedArrayString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'links',
      title: 'Linkler',
      type: 'array',
      of: [
        defineField({
          type: 'reference',
          name: 'links',
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
