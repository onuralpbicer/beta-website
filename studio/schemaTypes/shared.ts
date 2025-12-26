import {defineField, defineType} from 'sanity'

export const pageFields = [
  defineField({
    name: 'title',
    type: 'internationalizedArrayString',
    title: 'İsim',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'metaDescription',
    type: 'internationalizedArrayString',
    title: 'Meta Tanımı',
    validation: (rule) => rule.required(),
    // maybe make readonly for non-admins
  }),
  defineField({
    name: 'slug',
    type: 'internationalizedArrayString',
    title: 'Slug',
    validation: (rule) => rule.required(),
    // maybe make readonly for non-admins
  }),
]

export const blockContent = defineType({
  name: 'blockContent',
  type: 'array',
  of: [
    {
      type: 'block',
    },
  ],
})
