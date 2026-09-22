<template>
  <slot :key="key" />
</template>

<script lang="ts" setup>
// Used to update the canvas after resizing when the page is deactivated
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
