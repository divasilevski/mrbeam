import { type UnwrapNestedRefs } from 'vue'
import { PwaInjection } from '@vite-pwa/nuxt'

export default function () {
  const context = useNuxtApp()
  return context.$pwa as unknown as UnwrapNestedRefs<PwaInjection>
}
