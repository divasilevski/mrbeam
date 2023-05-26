<template>
  <div class="input-container">
    <label :for="`id:${props.id}`" v-html="props.label" />
    <input
      v-bind="$attrs"
      :id="`id:${props.id}`"
      :type="props.type"
      :value="props.modelValue"
      @input="onInput"
    />
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts" inherit-attrs="false" setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  error: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="postcss" scoped>
.input-container {
  @apply relative flex items-baseline gap-2 w-full;

  label {
    @apply font-medium text-secondary w-5;
  }

  input {
    @apply mt-1 w-full rounded-full border-primaryLight bg-background shadow-sm sm:text-sm;
  }

  .error {
    @apply absolute -bottom-4 right-4 text-xs text-error;
  }
}
</style>
