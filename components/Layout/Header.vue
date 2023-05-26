<template>
  <header class="header" :class="{ floating: props.floating }">
    <nav class="navigation">
      <NuxtLink class="logo" to="/">
        MrBeam
        <AppIcon name="logo" />
      </NuxtLink>

      <div class="header-right">
        <NuxtLink to="/docs">Docs</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const props = defineProps({
  floating: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="postcss" scoped>
.header {
  @apply bg-background border-b border-dashed border-complementary z-10;

  .navigation {
    @apply flex items-center justify-between h-header m-auto max-w-4xl px-4;
  }

  .logo {
    @apply relative font-bold text-lg py-1 pl-8;

    .icon {
      @apply absolute left-0 bottom-[11px] h-3 text-primary;
    }
  }

  .header-right {
    @apply flex items-center gap-4;

    a {
      @apply px-3 py-1 rounded-md font-medium hover:bg-complementary hover:text-primaryDark text-secondary;
    }

    .router-link-active {
      @apply bg-complementary;
    }
  }
}

.floating {
  @apply sticky top-0;
}
</style>
