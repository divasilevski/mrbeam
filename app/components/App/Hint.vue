<template>
  <div
    ref="hintRef"
    class="hint"
    @touchstart="onTouchstart"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <slot />

    <div class="content" :class="{ opened: isOpened }">
      <slot name="hint" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const isOpened = ref(false)
const hintRef = ref()

const onMouseenter = () => {
  isOpened.value = true
}

const onMouseleave = () => {
  isOpened.value = false
}

const onTouchstart = () => {
  isOpened.value = !isOpened.value
}

onClickOutside(hintRef, () => {
  isOpened.value = false
})
</script>

<style lang="scss">
.hint {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    position: absolute;
    bottom: 100%;
    left: 0;
    display: none;
    padding: 0.25rem 0.5rem;
    width: max-content;
    border-width: 1px;
    background: var(--color-background);
    box-shadow: var(--shadow-sm);
  }

  .content.opened {
    display: block;
  }
}
</style>
