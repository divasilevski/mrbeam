import { ModuleOptions } from '@vite-pwa/nuxt'
import colors from './palette'

export default <ModuleOptions['manifest']>{
  name: 'MrBeam',
  short_name: 'MrBeam',
  description: 'MrBeam - blazingly fast beam calculator',
  theme_color: colors.background,
  orientation: 'portrait',
  lang: 'en',
  icons: [
    {
      src: 'pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: 'pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
}
