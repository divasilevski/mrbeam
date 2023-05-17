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
  @apply flex items-center gap-1 py-2 px-6 border-0 rounded-full text-bg bg-accent hover:bg-accent-dark transition-colors;
}
</style>
