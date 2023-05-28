<template>
  <div class="flex flex-row justify-between">
    <article class="prose prose-slate">
      <VueComponent />
    </article>
  </div>
</template>

<script lang="ts" setup>
import { VueComponent } from '~/content/docs.md'
</script>
