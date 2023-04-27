<template>
  <div>
    <label :for="`id:${props.id}`">{{ props.label }}</label>
    <input
      :id="`id:${props.id}`"
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="input"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})

const emit = defineEmits(['update:modelValue'])

const input = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="postcss" scoped>
label {
  @apply block text-xs font-medium text-gray-700;
}

input {
  @apply mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm;
}
</style>
