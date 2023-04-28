<template>
  <button :type="props.type"><slot /></button>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
})
</script>

<style lang="postcss" scoped>
button {
  @apply text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-base;
}
</style>
