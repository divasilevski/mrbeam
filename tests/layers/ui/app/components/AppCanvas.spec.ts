import { enableAutoUnmount, mount } from '@vue/test-utils'
import AppCanvas from '#layers/ui/app/components/AppCanvas.vue'

enableAutoUnmount(afterEach)

type ResizeCallback = (ents: ResizeObserverEntry[], obs: ResizeObserver) => void

// jsdom has no `ResizeObserver`
class MockResizeObserver {
  static instances: MockResizeObserver[] = []

  readonly callback: ResizeCallback
  readonly targets: Element[] = []

  constructor(callback: ResizeCallback) {
    this.callback = callback
    MockResizeObserver.instances.push(this)
  }

  observe(target: Element) {
    this.targets.push(target)
  }

  trigger() {
    this.callback([], this)
  }

  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  MockResizeObserver.instances = []
  vi.stubGlobal('ResizeObserver', MockResizeObserver)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('AppCanvas', () => {
  it('emits the canvas element after mounting', async () => {
    const wrapper = mount(AppCanvas)
    await nextTick()

    const events = wrapper.emitted('update')
    expect(events?.at(-1)?.[0]).toBe(wrapper.get('canvas').element)
  })

  it('emits the canvas element again when it is resized', async () => {
    const wrapper = mount(AppCanvas)
    await nextTick()

    const canvas = wrapper.get('canvas').element
    const observer = MockResizeObserver.instances.at(-1)

    expect(observer?.targets).toEqual([canvas])

    const before = wrapper.emitted('update')?.length ?? 0
    observer?.trigger()
    await nextTick()

    const events = wrapper.emitted('update') ?? []
    expect(events).toHaveLength(before + 1)
    expect(events.at(-1)?.[0]).toBe(canvas)
  })
})
