<template>
  <component :is="icon" class="icon" />
</template>

<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const icon = defineAsyncComponent(
  () => import(`../../assets/svg/${props.name}.svg`)
)
</script>
