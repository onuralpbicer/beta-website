import {defineField, defineType} from 'sanity'
import {pageFields} from './shared'

export default defineType({
  name: 'richTextPage',
  title: 'Yazılı Sayfa',
  type: 'document',
  fields: [
    ...pageFields,
    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'İçerik',
      validation: (rule) => rule.required(),
    }),
  ],
})
