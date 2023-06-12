<template>
  <AppInput
    v-bind="$attrs.data"
    :model-value="props.modelValue"
    :error="error"
    autocomplete="off"
    inputmode="decimal"
    @update:model-value="onInput"
    @keyup.space="onKeySpace"
    @keypress="onKeypress"
    @paste="onPaste"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts" setup>
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const ALLOWED_SIGNS = ['.', '+', '-', '*', '^', '/', '(', ')']

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
})

const prevValue = ref()
const error = ref('')

const setError = () => {
  error.value = "can't calculate"
  setTimeout(() => (error.value = ''), 1000)
}

const calculate = () => {
  try {
    const value = props.modelValue
      .toString()
      .replace(/\^/g, '**')
      .replace(/,/g, '.')

    // eslint-disable-next-line no-eval
    emit('update:modelValue', eval(value))
    return true
  } catch (error) {
    setError()
  }
  return false
}

const isValidChar = (char: string) => {
  return [...DIGITS, ...ALLOWED_SIGNS].includes(char)
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

const onFocus = (event: FocusEvent) => {
  prevValue.value = props.modelValue
  const target = event.target as HTMLInputElement
  target.select()
}

const onKeySpace = () => {
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
