<template>
  <span
    class="icon"
    :style="{
      '--icon-url': `url(${iconUrl})`,
      '--icon-size': `${size}px`,
    }"
    aria-hidden="true"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 24,
  },
})

const appConfig = useAppConfig()

const iconUrl = computed(() => {
  const base = appConfig.ui.iconsUrl.replace(/\/+$/, '')
  return `${base}/${props.name}.svg`
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
