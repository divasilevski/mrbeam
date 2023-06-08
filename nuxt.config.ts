import svgLoader from 'vite-svg-loader'
import mdPlugin, { Mode } from 'vite-plugin-markdown'

import manifest from './constants/manifest'
import colors from './constants/palette'
import meta from './constants/meta'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxtjs/html-validator',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    'nuxt-purgecss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  purgecss: {
    enabled: true,
    safelist: [/simplebar/],
  },
  tailwindcss: {
    viewer: false, // doesn't work without ssr
  },
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
        { rel: 'mask-icon', href: '/mask-icon.svg', color: colors.primary },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta,
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
      routes: ['/', '/docs'],
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
    manifest,
  },
})
