<template>
  <slot :key="key" />
</template>

<script lang="ts" setup>
const key = ref(0)
const wasDeactivated = ref(false)

onActivated(() => {
  if (wasDeactivated.value) {
    key.value++
  }
})

onDeactivated(() => {
  wasDeactivated.value = true
})
</script>
