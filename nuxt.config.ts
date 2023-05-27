import svgLoader from 'vite-svg-loader'
import mdPlugin, { Mode } from 'vite-plugin-markdown'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
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
      mdPlugin({ mode: [Mode.VUE] }),
    ],
  },
  htmlValidator: {
    options: {
      rules: {
        'prefer-native-element': 'off', // Conflict with Simplebar
      },
    },
  },
  app: {
    keepalive: true,
    head: {
      title: 'MrBeam',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', href: '/favicon.svg', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'mask-icon', href: '/mask-icon.svg', color: '#1b8cff' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'white-translucent',
        },
      ],
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
      description: 'MrBeam - blazingly fast beam calculator',
      theme_color: '#ffffff',
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
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,ico}'],
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
