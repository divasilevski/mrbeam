import svgLoader from 'vite-svg-loader'
import inheritAttrs from 'vite-plugin-vue-setup-inherit-attrs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/html-validator',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
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
  content: {
    documentDriven: true,
  },
})
