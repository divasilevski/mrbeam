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

<style lang="scss" scoped>
.input-container {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  width: 100%;

  label {
    min-width: 1rem;
    font-size: 18px;
    text-align: right;
    color: var(--color-secondary);
  }

  input {
    margin-top: 0.25rem;
    width: 100%;
    border-color: var(--color-primary-light);
    border-radius: 9999px;
    background: var(--color-background);
    box-shadow: var(--shadow-sm);

    @media (min-width: 640px) {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }

  .error {
    position: absolute;
    right: 1rem;
    bottom: -1rem;
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--color-error);
  }
}
</style>
