<template>
  <pre>{{ generatedData }}</pre>
  <pre>{{ data }}</pre>
</template>

<script lang="ts" setup>
const { data: generatedData } = await useFetch('/api/generate', {
  server: true,
})
const { data } = await useFetch('/api/calculate', {
  method: 'post',
  body: unref(generatedData),
  server: true,
})
</script>
