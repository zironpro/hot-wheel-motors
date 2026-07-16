import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      fields: [
        { name: 'tagline', type: 'text' },
        { name: 'title', type: 'textarea' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'mobileImage', type: 'upload', relationTo: 'media' },
      ],
      defaultValue: [
        {
          tagline: "DUBAI'S PREMIER BOUTIQUE",
          title: "Luxury Cars.\nDelivered Worldwide.",
          description: "Explore our curated collection of the finest pre-owned luxury vehicles.",
        }
      ]
    },
    {
      name: 'whyUsFeatures',
      type: 'array',
      maxRows: 4,
      fields: [
        { 
          name: 'icon', 
          type: 'select', 
          options: [
            { label: 'Shield Check', value: 'ShieldCheck' },
            { label: 'Ban', value: 'Ban' },
            { label: 'Landmark', value: 'Landmark' },
            { label: 'Headset', value: 'Headset' },
            { label: 'Refresh', value: 'RefreshCcw' },
            { label: 'Tag', value: 'Tag' }
          ],
          required: true
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
      defaultValue: [
        { icon: 'ShieldCheck', title: 'Verified Cars', description: 'All cars are\ninspected & verified' },
        { icon: 'Ban', title: 'No Hidden Fees', description: 'Transparent pricing\nyou can trust' },
        { icon: 'Landmark', title: 'Flexible Finance', description: 'Easy loan options\navailable' },
        { icon: 'Headset', title: 'Dedicated Support', description: 'We are here\nto help you' },
      ]
    },
    {
      type: 'group',
      name: 'promoBanner',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'heading', type: 'text', defaultValue: 'Looking to sell your car?' },
        { name: 'subheading', type: 'textarea', defaultValue: 'Get the best price for your car in just a few simple steps.' },
        { name: 'buttonText', type: 'text', defaultValue: 'Sell Your Car Today' },
        { name: 'buttonLink', type: 'text', defaultValue: '/sell' },
      ]
    },
    {
      type: 'group',
      name: 'shippingSection',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'heading', type: 'text', defaultValue: 'WORLDWIDE SHIPPING & EXPORT ASSISTANCE' },
        { name: 'subheading', type: 'textarea', defaultValue: 'Seamless international delivery from Dubai to your doorstep.' },
        { name: 'buttonText', type: 'text', defaultValue: 'LEARN MORE' },
        { name: 'buttonLink', type: 'text', defaultValue: '/services' },
      ]
    }
  ],
}
