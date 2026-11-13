<template>
  <AppInput
    v-bind="$attrs"
    :id="props.id"
    :label="props.label"
    :model-value="props.modelValue"
    :error="error"
    autocomplete="off"
    inputmode="decimal"
    @update:model-value="onInput"
    @keydown.enter="onEvaluate"
    @keyup.space="onEvaluate"
    @keypress="onKeypress"
    @paste="onPaste"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
})

/**
 * Error logic
 */
const error = ref('')
let errorTimeout: NodeJS.Timeout | undefined

const setError = () => {
  error.value = "can't calculate"

  clearTimeout(errorTimeout)
  errorTimeout = setTimeout(() => (error.value = ''), 1000)
}

onUnmounted(() => clearTimeout(errorTimeout))

/**
 * Calculate logic
 */
const ARITHMETIC_ONLY = /^[\d.+\-*/()^\s]+$/
const evaluate = eval // Indirect eval: no bundler warning;

const calculate = () => {
  const value = props.modelValue
    .toString()
    .replace(/\^/g, '**')
    .replace(/,/g, '.')

  try {
    if (!ARITHMETIC_ONLY.test(value)) throw new Error('Not arithmetic')

    const result = evaluate(value)

    if (!Number.isFinite(result)) throw new Error('Not a finite number')

    emit('update:modelValue', result)
    return true
  } catch {
    setError()
  }
  return false
}

/**
 * Input handlers
 */
const isValidChar = (char: string) => {
  return char !== ' ' && ARITHMETIC_ONLY.test(char)
}

const getFiltered = (str: string) => {
  return str.split('').filter(isValidChar).join('')
}

const onInput = (value: string) => {
  emit('update:modelValue', value)
}

const onKeypress = (event: KeyboardEvent) => {
  if (!isValidChar(event.key)) {
    event.preventDefault()
  }
}

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault()

  const data = event.clipboardData
  const value = data?.getData('text')

  if (value) {
    emit('update:modelValue', getFiltered(value))
  }
}

/**
 * Focus and cancellation logic
 */
const prevValue = ref()

const onFocus = (event: FocusEvent) => {
  prevValue.value = props.modelValue
  const target = event.target as HTMLInputElement
  target.select()
}

const onEvaluate = () => {
  if (calculate()) {
    nextTick(() => (prevValue.value = props.modelValue))
  }
}

const onBlur = () => {
  if (props.modelValue === '') {
    emit('update:modelValue', 0)
    return
  }

  if (!calculate()) {
    emit('update:modelValue', prevValue.value)
  }
}
</script>
