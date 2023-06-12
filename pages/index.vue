<template>
  <article>
    <MainBeam />
    <MainInput />
    <MainTable />

    <Teleport to="body" :disabled="$route.name !== 'index'">
      <MainChart />
    </Teleport>
  </article>
</template>

<style lang="postcss" scoped>
article {
  @apply flex flex-col gap-4;
}
</style>
