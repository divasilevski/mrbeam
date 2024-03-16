import { createGtm } from '@gtm-support/vue-gtm'
import type { VueGtmUseOptions } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createGtm({
      id: 'GTM-KV6RHZS',
      vueRouter: useRouter() as VueGtmUseOptions['vueRouter'],
      enabled: process.env.NODE_ENV === 'production',
    }),
  )
})
