<template>
  <header class="header" :class="{ floating: !isIndexPage }">
    <nav class="navigation">
      <NuxtLink class="logo" to="/">
        MrBeam
        <Transition mode="out-in">
          <AppIcon
            v-if="!isIndexPage"
            class="arrow-icon"
            name="arrow"
            size="40"
          />
          <AppIcon v-else class="logo-icon" name="logo" size="33" />
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
const isIndexPage = computed(() => route.name === 'index')
</script>

<style lang="scss" scoped>
.header {
  z-index: 10;
  border-bottom: 1px dashed var(--color-complementary);
  background: var(--color-background);
  color: var(--color-secondary);

  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--height-header);
    margin: auto;
    padding: 0 1rem;
    max-width: 56rem;
  }

  .logo {
    position: relative;
    padding: 0.25rem 0 0.25rem 2rem;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.75rem;

    .arrow-icon {
      position: absolute;
      left: -0.25rem;
      bottom: -2px;
      color: var(--color-primary);
      transform: rotate(-90deg);
    }

    .logo-icon {
      position: absolute;
      left: 0;
      bottom: 11px;
      height: 0.75rem;
      color: var(--color-primary);
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;

    a {
      padding: 0.25rem 0.75rem;
      border-radius: 0.375rem;
      font-weight: 500;
      color: var(--color-secondary);

      &:hover {
        background: var(--color-complementary);
        color: var(--color-primary-dark);
      }
    }

    .router-link-active {
      background: var(--color-complementary);
    }
  }
}

.floating {
  position: sticky;
  top: 0;
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
