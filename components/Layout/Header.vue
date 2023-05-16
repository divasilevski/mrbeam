<template>
  <header class="header container">
    <NuxtLink class="logo" to="/">MrBeam</NuxtLink>

    <div class="header-right">
      <nav>
        <NuxtLink to="/docs">Docs</NuxtLink>
      </nav>

      <LayoutDropdown />
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  @apply flex items-center justify-between h-12;

  .logo {
    @apply font-bold text-xl py-1;
  }

  .header-right {
    @apply flex items-center gap-4;

    a {
      @apply px-3 py-1 rounded-md font-medium text-gray-500 hover:bg-slate-100;
    }

    .router-link-active {
      @apply bg-slate-100;
    }
  }
}
</style>
