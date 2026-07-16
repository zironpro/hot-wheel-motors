import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
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
          defaultValue: 'Driven by Passion.\nDefined by Trust.',
        },
        {
          name: 'subheading',
          type: 'textarea',
          required: true,
          defaultValue: 'Hot Wheels Motors is a luxury automotive boutique in Dubai, curating and delivering exceptional pre-owned vehicles to discerning clients worldwide.',
        },
        {
          name: 'backgroundImageDesktop',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'backgroundImageMobile',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the Lucide icon (e.g. Car, ShieldCheck, Globe)',
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
      ],
      defaultValue: [
        {
          icon: 'Car',
          title: 'Sourced in Dubai',
          description: 'Handpicked vehicles from trusted sources',
        },
        {
          icon: 'ShieldCheck',
          title: 'Quality Assured',
          description: 'Multi‑point inspection and verified mileage.',
        },
        {
          icon: 'Globe',
          title: 'Global Delivery',
          description: 'Secure shipping worldwide.',
        },
      ],
    },
    {
      name: 'story',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Our Journey',
        },
        {
          name: 'paragraph1',
          type: 'textarea',
          required: true,
          defaultValue: 'Founded with a clear vision, Hot Wheel Used Motors Trading LLC has become a trusted destination for exceptional pre-owned vehicles. We believe every purchase should feel transparent, seamless and rewarding.',
        },
        {
          name: 'paragraph2',
          type: 'textarea',
          required: true,
          defaultValue: 'Our curated collection brings together refined everyday luxury and rare performance models. Each vehicle is carefully selected to connect discerning drivers with the perfect car.',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'whyChooseUs',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Excellence in Every Detail.',
        },
        {
          name: 'cards',
          type: 'array',
          fields: [
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
              title: 'Immaculate Standards',
              description: 'Every vehicle is showroom ready.',
            },
            {
              title: 'Transparent Pricing',
              description: 'Clear pricing with no hidden fees.',
            },
            {
              title: 'Personal Service',
              description: 'Tailored support from inquiry to delivery.',
            },
            {
              title: 'After-Sales Care',
              description: 'Premium support beyond every purchase.',
            },
          ],
        },
      ],
    },
  ],
}
