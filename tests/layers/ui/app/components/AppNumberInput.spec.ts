import { defineComponent, h } from 'vue'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import AppInput from '#layers/ui/app/components/AppInput.vue'
import AppNumberInput from '#layers/ui/app/components/AppNumberInput.vue'

enableAutoUnmount(afterEach)
afterEach(() => (document.body.innerHTML = ''))

const AppHintStub = defineComponent({
  name: 'AppHint',
  setup(_props, { slots }) {
    return () => h('div', slots.default?.())
  },
})

const mountNumberInput = (modelValue = '') => {
  return mount(AppNumberInput, {
    props: { id: 'beam-force', label: 'F', modelValue },
    global: { components: { AppHint: AppHintStub, AppInput } },
    attachTo: document.body,
  })
}

const getLastEmit = (wrapper: ReturnType<typeof mountNumberInput>) => {
  const events = wrapper.emitted('update:modelValue')
  return events?.[events.length - 1]
}

// jsdom has no `ClipboardEvent` constructor.
const pasteText = (input: HTMLInputElement, text: string) => {
  const event = new Event('paste', { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'clipboardData', {
    value: { getData: () => text },
  })
  input.dispatchEvent(event)
  return event
}

describe('AppNumberInput', () => {
  const expressions: [string, number][] = [
    ['2+2', 4],
    ['2*3', 6],
    ['2^3', 8],
    ['1,5', 1.5],
  ]

  it.each(expressions)('evaluates %s on blur', async (expression, expected) => {
    const wrapper = mountNumberInput(expression)
    await wrapper.get('input').trigger('blur')

    expect(getLastEmit(wrapper)).toEqual([expected])
  })

  it('emits the raw value while typing', async () => {
    const wrapper = mountNumberInput()
    await wrapper.get('input').setValue('2+2')

    expect(wrapper.emitted('update:modelValue')).toEqual([['2+2']])
  })

  it('emits 0 when an empty field loses focus', async () => {
    const wrapper = mountNumberInput()
    await wrapper.get('input').trigger('blur')

    expect(wrapper.emitted('update:modelValue')).toEqual([[0]])
  })

  it('shows an error and restores the focus-time value for an invalid expression', async () => {
    const wrapper = mountNumberInput('2+2')
    const input = wrapper.get('input')

    await input.trigger('focus')
    await input.setValue('2+')
    await wrapper.setProps({ modelValue: '2+' })
    await input.trigger('blur')

    expect(wrapper.text()).toContain("can't calculate")
    expect(getLastEmit(wrapper)).toEqual(['2+2'])
  })

  it.each(['1/0', '2;3'])('does not evaluate %s', async (value) => {
    const wrapper = mountNumberInput(value)
    const input = wrapper.get('input')

    await input.trigger('focus')
    await input.trigger('blur')

    expect(wrapper.text()).toContain("can't calculate")
    expect(getLastEmit(wrapper)).toEqual([value])
  })

  it('filters pasted characters', () => {
    const wrapper = mountNumberInput()
    const event = pasteText(wrapper.get('input').element, '12a.5')

    expect(event.defaultPrevented).toBe(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([['12.5']])
  })

  it('evaluates the expression when space is pressed', async () => {
    const wrapper = mountNumberInput('2+2')
    await wrapper.get('input').trigger('keyup', { key: ' ' })
    await nextTick()

    expect(getLastEmit(wrapper)).toEqual([4])
  })

  it('evaluates the expression when Enter is pressed', async () => {
    const wrapper = mountNumberInput('2+2')
    await wrapper.get('input').trigger('keydown', { key: 'Enter' })
    await nextTick()

    expect(getLastEmit(wrapper)).toEqual([4])
  })
})
