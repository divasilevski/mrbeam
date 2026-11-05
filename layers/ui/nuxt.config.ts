export default defineNuxtConfig({
  // Стили подключает сам слой; css-энтри резолвятся как module id,
  // поэтому используем alias слоя, а не относительный путь.
  css: ['#layers/ui/app/assets/scss/main.scss'],
})
