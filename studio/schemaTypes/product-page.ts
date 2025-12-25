import {defineField, defineType} from 'sanity'
import {pageFields} from './shared'

export default defineType({
  name: 'productPage',
  title: 'Ürün Sayfası',
  type: 'document',
  fields: [
    ...pageFields,
    // todo later
  ],
})
