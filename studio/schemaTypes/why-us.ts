import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'whyUs',
  title: 'Neden Biz?',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'İsim', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'iconName', title: 'Icon ismi', type: 'string'}),
  ],
})
