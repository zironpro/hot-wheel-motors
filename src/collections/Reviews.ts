import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
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
        } catch (e) {
          console.error('[Revalidate Error] Reviews collection:', e)
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
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 5,
      required: true,
      min: 1,
      max: 5,
    },
  ],
}
