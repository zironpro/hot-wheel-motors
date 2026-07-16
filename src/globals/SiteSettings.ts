import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      defaultValue: '+971 55 578 1902',
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'sales@hotwheelmotors.com',
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: '123 Luxury Car Showroom\nSheikh Zayed Road\nDubai, UAE',
    },
    {
      name: 'openingHours',
      type: 'array',
      fields: [
        { name: 'days', type: 'text', required: true },
        { name: 'hours', type: 'text', required: true },
      ],
      defaultValue: [
        { days: 'Monday - Friday', hours: '09:00 am - 05:00 pm' },
        { days: 'Saturday - Sunday', hours: 'Closed' },
      ],
    },
    {
      name: 'openingHoursNote',
      type: 'text',
      defaultValue: '* Viewings can be arranged outside these hours by appointment.',
    },
    {
      name: 'contactUsButtonText',
      type: 'text',
      defaultValue: 'Enquire Now',
    },
    {
      name: 'contactUsButtonLink',
      type: 'text',
      defaultValue: '/contact',
    },
  ],
}
