<template>
  <div class="loader">
    <div></div>
  </div>
</template>

<style lang="postcss" scoped>
.loader {
  @apply relative h-7 w-7;

  div {
    @apply absolute inset-0 h-7 w-7 border-4 rounded-full;

    animation: loader 1.4s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: white transparent white transparent;
  }
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
