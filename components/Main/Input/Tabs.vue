<template>
  <nav>
    <a
      v-for="tab in tabs"
      :key="tab"
      :class="{ active: tab === props.modelValue }"
      @click="emit('update:modelValue', tab)"
      v-text="tab"
    />
  </nav>
</template>

<script lang="ts" setup>
const tabs = ['force', 'moment', 'distload', 'defenition', 'material']

const props = defineProps({
  modelValue: {
    type: String,
    default: 'force',
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="postcss" scoped>
nav {
  @apply flex border-b border-gray-100 text-sm font-medium;

  a {
    @apply -mb-px border-b border-transparent p-4 hover:text-blue-500 cursor-pointer;
  }

  .active {
    @apply border-current text-blue-500;
  }
}
</style>
