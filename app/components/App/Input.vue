<template>
  <div class="input-container">
    <AppHint v-if="hint">
      <label :for="`id:${id}`" v-html="label" />
      <template #hint>{{ hint }}</template>
    </AppHint>

    <label v-else :for="`id:${id}`" v-html="label" />

    <input
      v-bind="$attrs"
      :id="`id:${id}`"
      :type="type"
      :value="modelValue"
      @input="onInput"
    />
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

defineProps({
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
  hint: {
    type: String,
    default: undefined,
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
    @apply text-secondary text-[18px];
  }

  input {
    @apply mt-1 w-full rounded-full border-primaryLight bg-background shadow-sm sm:text-sm;
  }

  .error {
    @apply absolute -bottom-4 right-4 text-xs text-error;
  }
}
</style>
