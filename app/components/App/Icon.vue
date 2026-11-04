<template>
  <span
    class="icon"
    :style="{
      '--icon-url': `url(/icons/${name}.svg)`,
      '--icon-size': `${size}px`,
    }"
    aria-hidden="true"
  />
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 24,
  },
})
</script>

<style lang="scss" scoped>
.icon {
  --icon-width: var(--icon-size);
  --icon-height: var(--icon-size);

  display: inline-block;
  width: var(--icon-width);
  height: var(--icon-height);
  mask-image: var(--icon-url);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background: currentColor;
}
</style>
