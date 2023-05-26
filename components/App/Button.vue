<template>
  <button :type="props.type" :class="props.size"><slot /></button>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  size: {
    type: String as () => 'base' | 'small',
    default: 'base',
  },
})
</script>

<style lang="postcss" scoped>
button {
  @apply flex items-center gap-2 py-2 px-6 border-0 rounded-full font-semibold tracking-wider text-bg bg-accent hover:bg-accent-dark transition-colors;
}
button.small {
  @apply text-sm;
}
</style>
