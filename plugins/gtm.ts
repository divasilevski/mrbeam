export default defineNuxtPlugin((nuxtApp) => {
  const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','GTMDataLayer','GTM-KV6RHZS');`
  const gtmNoscript = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KV6RHZS height="0" width="0" style="display:none;visibility:hidden"></iframe>`

  nuxtApp.vueApp.use({
    install() {
      useHead({
        script: [{ innerHTML: gtmScript }],
        noscript: [{ innerHTML: gtmNoscript }],
      })
    },
  })
})
