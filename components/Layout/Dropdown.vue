<template>
  <div class="dropdown">
    <AppIconButton ref="buttonRef" name="menu" @click="onToggle">
      Menu
    </AppIconButton>

    <div v-if="isShown" class="panel" role="menu">
      <div class="item-container">
        <div class="item" role="menuitem">History</div>
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
    @apply absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg;

    .item-container {
      @apply p-2 cursor-pointer;

      .item {
        @apply block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700;
      }
    }
  }
}
</style>
