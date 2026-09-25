<template>
  <AppHint>
    <AppIcon :name="props.name" />
    <template #hint>
      <slot />
    </template>
  </AppHint>
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
.hint {
  @apply w-8 h-8 rounded-full;

  .icon {
    @apply transition-colors text-primaryLight cursor-pointer hover:text-primary;
  }
}
</style>
