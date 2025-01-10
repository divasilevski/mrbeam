export default defineNuxtPlugin((nuxtApp) => {
  const gtagScript =
    "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'id:GTAG')"

  nuxtApp.vueApp.use({
    install() {
      useHead({ script: [{ innerHTML: gtagScript }] })
    },
  })
})
