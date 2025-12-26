import {defineField, defineType} from 'sanity'

export const pageFields = [
  defineField({
    // should match 'languageField' plugin configuration setting, if customized
    name: 'language',
    type: 'string',
    readOnly: true,
    // hidden: true,
  }),
  defineField({
    name: 'title',
    type: 'string',
    title: 'İsim',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'metaDescription',
    type: 'string',
    title: 'Meta Tanımı',
    validation: (rule) => rule.required(),
    // maybe make readonly for non-admins
  }),
  defineField({
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    validation: (rule) => rule.required(),
    options: {
      source: 'title',
    },
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
