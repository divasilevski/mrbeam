<template>
  <button type="button">
    <AppIcon :name="props.name" />
    <span class="sr-only"><slot /></span>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<style lang="postcss" scoped>
button {
  @apply flex items-center justify-center w-8 h-8 rounded-full text-tertiary transition-colors hover:text-primary;
}
</style>
