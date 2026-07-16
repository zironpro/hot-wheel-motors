import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Premium Services',
        },
        {
          name: 'subheading',
          type: 'textarea',
          required: true,
          defaultValue: 'From worldwide shipping to tailored financing, we make your luxury car purchase effortless.',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'servicesList',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'What We Offer',
        },
        {
          name: 'subheading',
          type: 'textarea',
          required: true,
          defaultValue: 'Thoughtfully designed services supporting every stage of your luxury car journey.',
        },
        {
          name: 'services',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'text',
              required: true,
              admin: {
                description: 'Name of the Lucide icon (e.g. CarFront, Banknote, Globe2, ShieldCheck, Settings2, FileText)',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
          defaultValue: [
            {
              icon: 'CarFront',
              title: 'Vehicle Sourcing',
              description: 'Tell us what you’re looking for, and we’ll source the right vehicle through our trusted network.',
            },
            {
              icon: 'Banknote',
              title: 'Tailored Financing',
              description: 'Flexible financing options designed to make your luxury car purchase simple and convenient.',
            },
            {
              icon: 'Globe2',
              title: 'Worldwide Export',
              description: 'We manage the paperwork, logistics and secure delivery of your vehicle worldwide.',
            },
            {
              icon: 'ShieldCheck',
              title: 'Extended Warranty',
              description: 'Choose extended warranty coverage designed for added confidence and peace of mind.',
            },
            {
              icon: 'Settings2',
              title: 'Consignment & Trade-In',
              description: 'Receive a fair valuation and enjoy a smooth, hassle-free selling or trade-in process.',
            },
            {
              icon: 'FileText',
              title: 'Registration & Insurance',
              description: 'We assist with vehicle registration, documentation and suitable insurance options.',
            },
          ],
        },
      ],
    },
  ],
}
