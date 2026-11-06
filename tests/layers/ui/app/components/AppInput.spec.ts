import { defineComponent, h } from 'vue'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import AppInput from '#layers/ui/app/components/AppInput.vue'

enableAutoUnmount(afterEach)

const AppHintStub = defineComponent({
  name: 'AppHint',
  setup(_props, { slots }) {
    return () => h('div', slots.default?.())
  },
})

const mountInput = () => {
  return mount(AppInput, {
    props: { id: 'beam-x', label: 'x' },
    global: { components: { AppHint: AppHintStub } },
  })
}

describe('AppInput', () => {
  it('emits update:modelValue on typing', async () => {
    const wrapper = mountInput()

    await wrapper.get('input').setValue('12')
    expect(wrapper.emitted('update:modelValue')).toEqual([['12']])
  })

  it('links the label to the input', () => {
    const wrapper = mountInput()
    // The DOM id scheme is an implementation detail; assert the relation.
    const inputId = wrapper.get('input').attributes('id')

    expect(inputId).toBeTruthy()
    expect(wrapper.get('label').attributes('for')).toBe(inputId)
  })
})
