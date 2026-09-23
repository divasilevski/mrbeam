<template>
  <NuxtLink to="/" class="error">
    MrBeam
    <AppIcon name="logo" class="logo-icon" />
    <div class="message">Error {{ statusCode }}</div>
    <div class="description">
      <div v-if="statusCode === 404">Page not found or no longer exist</div>
      <div v-else>Something went wrong</div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps({
  error: {
    type: Object,
    default: undefined,
  },
})

const statusCode = computed(() => {
  return props.error?.statusCode
})
</script>

<style lang="postcss">
.error {
  @apply flex items-center justify-center flex-col gap-2 h-screen 
    text-secondary font-sans font-bold text-3xl;

  .logo-icon {
    @apply text-primary my-4;
  }

  .message {
    @apply text-2xl;
  }

  .description {
    @apply text-base px-4 text-center max-w-sm;
  }
}
</style>
