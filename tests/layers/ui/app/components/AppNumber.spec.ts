import { enableAutoUnmount, mount } from '@vue/test-utils'
import AppNumber from '#layers/ui/app/components/AppNumber.vue'

enableAutoUnmount(afterEach)

describe('AppNumber', () => {
  it('formats a single number', () => {
    const wrapper = mount(AppNumber, { props: { value: 1234 } })
    expect(wrapper.text()).toContain('1.2K')
  })

  it('joins array values', () => {
    const wrapper = mount(AppNumber, { props: { value: [1234, 5678] } })
    expect(wrapper.text()).toContain('1.2K ... 5.7K')
  })

  it('marks values that were reformatted', () => {
    const wrapper = mount(AppNumber, { props: { value: 1234 } })
    expect(wrapper.text()).toContain('★')
  })

  it('does not mark values that need no formatting', () => {
    const wrapper = mount(AppNumber, { props: { value: 42 } })
    expect(wrapper.text()).not.toContain('★')
  })
})
