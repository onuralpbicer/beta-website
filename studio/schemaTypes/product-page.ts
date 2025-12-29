import {defineType} from 'sanity'
import {pageFields, pagePreview, productOrCategoryFields} from './shared'

export default defineType({
  name: 'productPage',
  title: 'Ürün Sayfası',
  type: 'document',
  preview: pagePreview,
  fields: [
    ...pageFields,
    ...productOrCategoryFields,
    // todo later
  ],
})
