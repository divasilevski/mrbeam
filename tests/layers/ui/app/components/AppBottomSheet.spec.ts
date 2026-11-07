import { defineComponent, h } from 'vue'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import AppBottomSheet from '#layers/ui/app/components/AppBottomSheet.vue'

enableAutoUnmount(afterEach)

// The real component is a Nuxt plugin global; VTU cannot stub an unresolved tag.
const Simplebar = defineComponent({
  name: 'Simplebar',
  setup(_props, { slots }) {
    return () => h('div', slots.default?.())
  },
})

const MIN_HEIGHT = 120
const MAX_HEIGHT = 480

const mountSheet = (props: { hasIdent?: boolean } = {}) => {
  return mount(AppBottomSheet, {
    props: { minHeight: MIN_HEIGHT, maxHeight: MAX_HEIGHT, ...props },
    slots: { default: 'Sheet content' },
    global: { components: { Simplebar } },
  })
}

describe('AppBottomSheet', () => {
  it('starts collapsed to the minimum height', () => {
    const content = mountSheet().get('.content').element as HTMLElement

    expect(content.style.height).toBe(`${MIN_HEIGHT}px`)
    expect(content.style.transform).toBe(`translateY(${MIN_HEIGHT}px)`)
    expect(content.dataset.status).toBe('min')
  })

  it('switches between min and max through the exposed API', async () => {
    const wrapper = mountSheet()
    const vm = wrapper.vm

    expect(vm.status).toBe(vm.Status.MinHeight)

    vm.toggleStatus()
    await nextTick()

    const content = wrapper.get('.content').element as HTMLElement
    expect(vm.status).toBe(vm.Status.MaxHeight)
    expect(vm.isChangeToMax).toBe(true)
    expect(content.style.height).toBe(`${MAX_HEIGHT}px`)
    expect(content.dataset.status).toBe('max')
  })

  it('keeps the sheet in place when it is identified', () => {
    const wrapper = mountSheet({ hasIdent: true })
    const content = wrapper.get('.content').element as HTMLElement

    expect(content.style.transform).toBe('translateY(0px)')
  })

  it('renders the default slot inside the scroll container', () => {
    const wrapper = mountSheet()

    expect(wrapper.findComponent(Simplebar).text()).toBe('Sheet content')
  })
})
