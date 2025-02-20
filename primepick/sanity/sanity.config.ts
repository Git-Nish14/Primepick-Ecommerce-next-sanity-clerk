import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './deskStructure/structure'

export default defineConfig({
  name: 'default',
  title: 'E-commerce-build',

  projectId: 'l8wch8i3',
  dataset: 'primepick',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: 'http://localhost:3000/',
        previewMode: {
          enable: '/draft-mode/enable', // The API route to enable draft mode
          disable: '/draft-mode/disable', // The API route to disable draft mode
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
