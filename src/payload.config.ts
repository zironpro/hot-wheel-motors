import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Cars } from './collections/Cars'
import { Media } from './collections/Media'
import { Brands } from './collections/Brands'
import { Reviews } from './collections/Reviews'

import { AboutPage } from './globals/AboutPage'
import { ServicesPage } from './globals/ServicesPage'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      access: {
        read: () => true,
      },
      fields: [],
    },
    Cars,
    Media,
    Brands,
    Reviews,
  ],
  globals: [
    AboutPage,
    ServicesPage,
    SiteSettings,
    HomePage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    push: true,
  }),
  sharp: sharp as any,
  plugins: [],
})
