import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter-store', () => {
  const counter = ref(0)

  const increase = () => {
    counter.value++
  }

  return { counter, increase }
})
