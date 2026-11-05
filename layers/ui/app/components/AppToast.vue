<template>
  <div class="toast" role="alert">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-width: 1px;
  border-color: var(--color-complementary);
  border-radius: 0.5rem;
  background: var(--color-background);
  color: var(--color-secondary);
  box-shadow: var(--shadow-md);

  :deep(button) {
    margin-right: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-width: 1px;
    border-color: var(--color-complementary);
    border-radius: 0.375rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: var(--shadow-sm);

    &:hover {
      background: var(--color-complementary);
    }
  }
}
</style>
