import svgLoader from 'vite-svg-loader'
import inheritAttrs from 'vite-plugin-vue-setup-inherit-attrs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/html-validator',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  vite: {
    plugins: [
      svgLoader({
        defaultImport: 'component',
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: { overrides: { removeViewBox: false } },
            },
          ],
        },
      }),
      inheritAttrs(),
    ],
  },
  htmlValidator: {
    options: {
      rules: {
        'prefer-native-element': 'off', // Conflict with Simplebar
      },
    },
  },

  // pwa settings
  experimental: {
    payloadExtraction: false,
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      routes: ['/', '/docs', '/about'],
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'MrBeam',
      short_name: 'MrBeam',
      theme_color: '#ffffff',
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
      ],
    },
    workbox: {
      navigateFallback: '/',
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
})
