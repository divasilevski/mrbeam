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

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  border-width: 0;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  letter-spacing: 0.05em;
  color: var(--color-background);
  background: var(--color-primary);
  transition: background-color var(--duration-fast) var(--ease-standard);
  cursor: pointer;

  &:hover {
    background: var(--color-primary-dark);
  }
}
</style>
