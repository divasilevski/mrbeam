<template>
  <NuxtLink to="/" class="error">
    MrBeam
    <AppIcon class="logo-icon" name="logo" size="33" />
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

<style lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 100vh;
  color: var(--color-secondary);
  font-family: var(--font-sans);
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 2.25rem;

  .logo-icon {
    margin: 0.5rem 0;
    color: var(--color-primary);
  }

  .message {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .description {
    padding: 0 1rem;
    max-width: 24rem;
    font-size: 1rem;
    line-height: 1.5rem;
    text-align: center;
  }
}
</style>
