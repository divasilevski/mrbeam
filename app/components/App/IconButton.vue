<template>
  <button type="button">
    <AppIcon :name="name" :size="size" />
    <span class="sr-only"><slot /></span>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: 24,
  },
})
</script>

<style lang="postcss" scoped>
button {
  @apply flex items-center justify-center w-8 h-8 rounded-full
    text-tertiary transition-colors hover:text-primary;
}
</style>
