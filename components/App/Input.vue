<template>
  <div class="input-container">
    <label :for="`id:${props.id}`" v-html="props.label" />
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
.input-container {
  @apply flex items-baseline gap-2 w-full;

  label {
    @apply font-medium text-gray-700 w-5;
  }

  input {
    @apply mt-1 w-full rounded-full border-gray-200 shadow-sm sm:text-sm;
  }
}
</style>
