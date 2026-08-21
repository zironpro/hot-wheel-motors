import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Cars: CollectionConfig = {
  slug: 'cars',
  admin: {
    useAsTitle: 'title',
    components: {
      beforeListTable: ['@/components/BulkUpload#BulkUpload'],
    },
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Automatically generate the title from make, model, and year
        if (data) {
          const make = data.make || '';
          const model = data.model || '';
          const year = data.year || '';
          data.title = `${make} ${model} ${year}`.trim();
        }
        return data;
      }
    ],
    afterRead: [
      ({ doc }) => {
        // Dynamically provide the title for existing documents that haven't been updated yet
        if (doc && !doc.title) {
          const make = doc.make || '';
          const model = doc.model || '';
          const year = doc.year || '';
          doc.title = `${make} ${model} ${year}`.trim();
        }
        return doc;
      }
    ],
    afterChange: [
      ({ doc }) => {
        try {
          revalidatePath('/')
          revalidatePath('/cars')
          if (doc?.slug) {
            revalidatePath(`/cars/${doc.slug}`)
          }
        } catch (e) {
          console.error('[Revalidate Error] Cars collection:', e)
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        try {
          revalidatePath('/')
          revalidatePath('/cars')
          if (doc?.slug) {
            revalidatePath(`/cars/${doc.slug}`)
          }
        } catch (e) {
          console.error('[Revalidate Error] Cars collection:', e)
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true, // Hide in the edit view since it's auto-generated
      },
    },
    {
      name: 'make',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL friendly string, e.g. "ferrari-f8-tributo"',
      },
    },
    {
      name: 'model',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
    },
    {
      name: 'vin',
      type: 'text',
      admin: {
        description: 'Vehicle Identification Number',
      },
    },
    {
      name: 'currency',
      type: 'select',
      required: true,
      defaultValue: 'AED',
      options: [
        { label: 'AED', value: 'AED' },
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'GBP', value: 'GBP' },
        { label: 'SAR', value: 'SAR' },
        { label: 'QAR', value: 'QAR' },
        { label: 'KWD', value: 'KWD' },
        { label: 'OMR', value: 'OMR' },
        { label: 'BHD', value: 'BHD' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'engine',
      type: 'text',
      required: true,
    },
    {
      name: 'kmDriven',
      type: 'text',
      required: true,
    },
    {
      name: 'color',
      type: 'text',
      required: true,
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
      label: 'Available',
      admin: {
        description: 'Mark if this car is currently available',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Car',
      admin: {
        description: 'Check this to show the car in the Featured Cars section on the homepage',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        }
      ]
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
