import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import { productType } from './productType'
import { orderType } from './orderType'
import { salesType } from './salesType'

export const schemaTypes = [blockContentType, categoryType, productType, orderType, salesType]
