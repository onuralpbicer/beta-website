import {defineField, defineType} from 'sanity'
import {pageFields, pagePreview} from './shared'

export default defineType({
  name: 'productPage',
  title: 'Ürün Sayfası',
  type: 'document',
  preview: pagePreview,
  fields: [
    ...pageFields,
    // todo later
  ],
})
