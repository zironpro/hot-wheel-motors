import type { CollectionConfig } from 'payload'

export const Cars: CollectionConfig = {
  slug: 'cars',
  admin: {
    useAsTitle: 'make',
    components: {
      beforeListTable: ['@/components/BulkUpload#BulkUpload'],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
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
