<template>
  <header class="header" :class="{ floating: !isIndexPage }">
    <nav class="navigation">
      <NuxtLink class="logo" to="/">
        MrBeam
        <Transition mode="out-in">
          <AppIcon v-if="!isIndexPage" name="arrow" class="arrow-icon" />
          <AppIcon v-else name="logo" class="logo-icon" />
        </Transition>
      </NuxtLink>

      <div class="header-right">
        <NuxtLink to="/docs">Docs</NuxtLink>
        <NuxtLink to="https://github.com/divasilevski/mrbeam" target="_blank">
          Github
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const route = useRoute()

const isIndexPage = computed(() => {
  return route.name === 'index'
})
</script>

<style lang="postcss" scoped>
.header {
  @apply bg-background border-b border-dashed border-complementary text-secondary z-10;

  .navigation {
    @apply flex items-center justify-between h-header m-auto max-w-4xl px-4;
  }

  .logo {
    @apply relative font-bold text-lg py-1 pl-8;

    .arrow-icon {
      @apply absolute -left-1 -bottom-[2px] -rotate-90 text-primary;
    }

    .logo-icon {
      @apply absolute left-0 bottom-[11px] h-3 text-primary;
    }
  }

  .header-right {
    @apply flex items-center gap-4;

    a {
      @apply px-3 py-1 rounded-md font-medium text-secondary
        hover:bg-complementary hover:text-primaryDark;
    }

    .router-link-active {
      @apply bg-complementary;
    }
  }
}

.floating {
  @apply sticky top-0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
