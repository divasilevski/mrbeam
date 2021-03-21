export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'mrbeam3.0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/paper.ts', mode: 'client' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    '~/components',
    '~/components/Forms',
    '~/components/Inputs',
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/color-mode',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],

  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'https://mrbeam-api.herokuapp.com/',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
