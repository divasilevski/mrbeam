import useCounter from '~/composables/useCounter'

describe('useCounter', () => {
  it('should exist', () => {
    expect(useCounter).toBeTruthy()
  })

  it('should have an initial value', () => {
    const { counter } = useCounter(10)
    expect(counter.value).toBe(10)
  })

  it('should increase counter on call', () => {
    const { counter, increase } = useCounter()

    expect(counter.value).toBe(0)
    increase()
    expect(counter.value).toBe(1)
  })
})
