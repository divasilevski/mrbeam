import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default {
  generate(axios: NuxtAxiosInstance) {
    return axios.$get('generate')
  },
}
