<template>
  <div class="dropdown">
    <AppIconButton ref="buttonRef" name="menu" @click="onToggle">
      Menu
    </AppIconButton>

    <div v-if="isShown" class="panel" role="menu">
      <div class="item-container">
        <NuxtLink
          class="item"
          role="menuitem"
          to="https://github.com/divasilevski/mrbeam"
          target="_blank"
          external
        >
          GitHub
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const buttonRef = ref()
const isShown = ref(false)

const onToggle = () => {
  isShown.value = !isShown.value
}

onClickOutside(buttonRef, () => {
  if (isShown.value) {
    isShown.value = false
  }
})
</script>

<style lang="postcss">
.dropdown {
  @apply relative;

  .panel {
    @apply absolute end-0 z-10 mt-2 w-56 rounded-md border border-secondary-light bg-bg shadow-lg;

    .item-container {
      @apply p-2 cursor-pointer;

      .item {
        @apply block rounded-lg px-4 py-2 text-sm text-accent hover:bg-secondary-light hover:text-accent-dark;
      }
    }
  }
}
</style>
