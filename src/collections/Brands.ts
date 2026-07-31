import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath('/')
          revalidatePath('/cars')
        } catch (e) {
          console.error('[Revalidate Error] Brands collection:', e)
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
