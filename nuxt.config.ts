import mdPlugin, { Mode } from 'vite-plugin-markdown'

import manifest from './constants/manifest'
import colors from './constants/palette'
import meta from './constants/meta'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2026-09-19',
  components: {
    dirs: [{ path: '~/components', pathPrefix: false }],
  },
  devServer: { port: 2023 },
  appConfig: {
    ui: {
      iconsUrl: '/icons', // Base URL for UI-layer icons (static assets)
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
  modules: ['@vite-pwa/nuxt', '@vueuse/nuxt', '@nuxt/eslint'],
  $production: {
    devtools: { enabled: false },
  },
  $development: {
    modules: ['@nuxtjs/html-validator'],
    htmlValidator: {
      options: {
        rules: {
          'prefer-native-element': 'off', // Conflict with Simplebar
        },
      },
    },
  },
  vite: {
    plugins: [mdPlugin({ mode: [Mode.VUE] })],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        noUncheckedIndexedAccess: false,
      },
    },
  },

  // optimization
  vue: { optionsApi: false },
  experimental: { appManifest: false }, // no server routes
  nitro: {
    preset: 'bun',
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      routes: ['/', '/docs'],
    },
  },

  // pwa settings
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
