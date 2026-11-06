export default defineNuxtConfig({
  // The layer loads its own styles; css entries resolve as module ids,
  // so use the layer alias instead of a relative path.
  css: ['#layers/ui/app/assets/scss/main.scss'],
})
