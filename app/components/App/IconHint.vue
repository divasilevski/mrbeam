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

<style lang="scss" scoped>
.hint {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;

  .icon {
    cursor: pointer;
    color: var(--color-primary-light);
    transition: color var(--duration-fast) var(--ease-standard);

    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
