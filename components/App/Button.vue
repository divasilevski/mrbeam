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
  @apply flex items-center gap-1 py-2 px-6 border-0 rounded-full text-white bg-blue-500 focus:outline-none hover:bg-blue-600;
}
</style>
