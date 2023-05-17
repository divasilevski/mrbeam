<template>
  <header class="header container">
    <NuxtLink class="logo" to="/">
      MrBeam
      <AppIcon name="logo" />
    </NuxtLink>

    <div class="header-right">
      <nav>
        <NuxtLink to="/docs">Docs</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </nav>

      <LayoutDropdown />
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  @apply flex items-center justify-between h-14;

  .logo {
    @apply relative font-bold text-xl py-1 pl-8;

    .icon {
      @apply absolute left-0 bottom-[11px] h-3 text-accent;
    }
  }

  .header-right {
    @apply flex items-center gap-4 text-accent;

    a {
      @apply px-3 py-1 rounded-md font-medium hover:bg-secondary-light hover:text-accent-dark visited:text-accent;
    }

    .router-link-active {
      @apply bg-secondary-light;
    }
  }
}
</style>
