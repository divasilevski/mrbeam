<template>
  <button @click="clickHandler">Nuxt app test</button>
</template>

<script lang="ts" setup>
const isClicked = ref(false)

const clickHandler = () => {
  // eslint-disable-next-line no-console
  console.log('test click')
  isClicked.value = true
}
</script>
