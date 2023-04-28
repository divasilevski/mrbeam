<template>
  <div class="defenitions">
    <div
      v-for="defenition in defenitions"
      :key="defenition"
      :class="{ active: defenition === props.modelValue }"
      @click="emit('update:modelValue', defenition)"
      v-text="defenition"
    />
  </div>
</template>

<script lang="ts" setup>
const defenitions = ['simple', 'hinge', 'fixed']

const props = defineProps({
  modelValue: {
    type: String,
    default: 'simple',
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="postcss">
.defenitions {
  @apply flex gap-2 text-sm font-medium;

  div {
    @apply py-1 px-4 rounded text-white bg-blue-500 hover:bg-blue-600 cursor-pointer;
  }

  .active {
    @apply bg-blue-600;
  }
}
</style>
