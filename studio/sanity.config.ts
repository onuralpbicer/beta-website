import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {languages} from '../config'
import {trTRLocale} from '@sanity/locale-tr-tr'

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
      fieldTypes: ['string', 'blockContent', 'file', 'number', 'boolean'],
    }),
    trTRLocale(),
  ],

  schema: {
    types: schemaTypes,
  },
})
