<template>
  <div class="toast" role="alert">
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
.toast {
  @apply fixed bottom-4 right-4 p-4 flex flex-col gap-2 border rounded-lg
    border-complementary text-secondary bg-background shadow-md z-50;

  :deep(button) {
    @apply border rounded-md border-complementary outline-none px-2 py-[0.25rem]
      mr-2 shadow-sm hover:bg-complementary;
  }
}
</style>
