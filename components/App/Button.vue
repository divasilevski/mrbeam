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
  @apply flex items-center gap-2 py-2 px-6 border-0 rounded-full font-semibold tracking-wider text-sm text-background bg-primary hover:bg-primaryDark transition-colors;
}
</style>
