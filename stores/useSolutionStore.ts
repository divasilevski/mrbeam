import { defineStore } from 'pinia'
import { useUnitsStore } from '~/stores/useUnitsStore'

export const useSolutionStore = defineStore('solution-store', () => {
  const store = useUnitsStore()
  const { scrollTo } = useMainScroll()

  const loading = ref(false)
  const solution = ref<Solution | null>(null)
  const solutionError = ref<string | null>(null)

  const isCalculated = computed(() => {
    return store.units.length > 0
  })

  const hasSolution = computed(() => {
    return Boolean(solution.value)
  })

  const resetSolution = () => {
    solution.value = null
    solutionError.value = null
  }

  const calculateAsync = async () => {
    if (store.units.length > 0) {
      loading.value = true

      const { data, error } = await useFetch('/api/calculate', {
        method: 'post',
        body: store.units,
      })

      loading.value = false

      if (data.value) {
        scrollTo({ top: 0, behavior: 'smooth' })
        solution.value = JSON.parse(data.value)
      }

      if (error.value) {
        solutionError.value = error.value.data.message
      }
    }
  }

  return {
    loading,
    solution,
    hasSolution,
    isCalculated,
    solutionError,

    resetSolution,
    calculateAsync,
  }
})
