import type { GlobalConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath('/')
        } catch (e) {
          console.error('[Revalidate Error] HomePage global:', e)
        }
      },
    ],
  },
  fields: [
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
      ],
      defaultValue: [
        { icon: 'ShieldCheck', title: 'Verified Cars' },
        { icon: 'Ban', title: 'No Hidden Fees' },
        { icon: 'Landmark', title: 'Flexible Finance' },
        { icon: 'Headset', title: 'Dedicated Support' },
      ]
    },
    {
      type: 'group',
      name: 'promoBanner',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Looking to sell your car?' },
        { name: 'subheading', type: 'textarea', defaultValue: 'Get the best price for your car in just a few simple steps.' },
        { name: 'buttonText', type: 'text', defaultValue: 'Sell Your Car Today' },
        { name: 'buttonLink', type: 'text', defaultValue: '/contact?message=I%20am%20interested%20in%20selling%20my%20car' },
      ]
    },
    {
      type: 'group',
      name: 'shippingSection',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'WORLDWIDE SHIPPING & EXPORT ASSISTANCE' },
        { name: 'subheading', type: 'textarea', defaultValue: 'Seamless international delivery from Dubai to your doorstep.' },
        { name: 'buttonText', type: 'text', defaultValue: 'LEARN MORE' },
        { name: 'buttonLink', type: 'text', defaultValue: '/services' },
      ]
    }
  ],
}
