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

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  color: var(--color-tertiary);
  transition: color var(--duration-fast) var(--ease-standard);
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
  }
}
</style>
