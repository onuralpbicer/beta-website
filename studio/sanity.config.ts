import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

const languages = [
  {
    id: 'en',
    title: 'English',
  },
  {
    id: 'tr',
    title: 'Turkish',
  },
]

export default defineConfig({
  name: 'default',
  title: 'beta-website',

  projectId: '12mm2gbu',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    internationalizedArray({
      languages,
      defaultLanguages: ['en', 'tr'],
      fieldTypes: ['string', 'blockContent'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
