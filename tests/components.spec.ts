import { mount } from '@vue/test-utils'

import AppButton from '~/components/App/Button.vue'

describe('AppButton', async () => {
  const wrapper = mount(AppButton)
  await wrapper.get('button').trigger('click')

  it('should exist', () => {
    expect(AppButton).toBeTruthy()
  })
})
