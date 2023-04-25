import { mount } from '@vue/test-utils'

import TestButton from '~/components/TestButton.vue'

describe('TestButton', async () => {
  const spyLog = vi.spyOn(global.console, 'log')
  const wrapper = mount(TestButton)
  await wrapper.get('button').trigger('click')

  it('should exist', () => {
    expect(TestButton).toBeTruthy()
  })

  it('should output console log', () => {
    expect(spyLog).toHaveBeenCalledWith('test click')
  })

  it('should change the variable isClicked', () => {
    expect(wrapper.vm.isClicked).toBeTruthy()
  })
})
