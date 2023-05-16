<template>
  <div class="flex flex-row justify-between">
    <article class="prose prose-slate">
      <ContentDoc />
    </article>

    <aside class="sticky top-20 self-start">
      <ul v-if="toc && toc.links">
        <li v-for="link in toc.links" :key="link.text">
          <a :href="`#${link.id}`">
            {{ link.text }}
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const { toc } = useContent()
</script>
