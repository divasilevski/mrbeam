import { defineStore } from 'pinia'

export const useUnitsStore = defineStore('units-store', () => {
  const units = ref<Unit[]>([])
  const loading = ref(false)
  const solution = ref<Solution | null>(null)
  const solutionError = ref<string | null>(null)

  const { scrollTo } = useMainScroll()

  const isCalculated = computed(() => {
    return units.value.length > 0
  })

  const hasSolution = computed(() => {
    return Boolean(solution.value)
  })

  const resetSolution = () => {
    solution.value = null
    solutionError.value = null
  }

  const add = (unit: Unit) => {
    units.value = [...units.value, unit]
    resetSolution()
  }

  const clear = () => {
    units.value = []
    resetSolution()
  }

  const removeById = (id: string) => {
    units.value = units.value.filter((unit: Unit) => unit.id !== id)
    resetSolution()
  }

  const generateAsync = async () => {
    const { data } = await useFetch('/api/generate')

    if (data.value) {
      units.value = JSON.parse(data.value)
      await calculateAsync()
    }
  }

  const calculateAsync = async () => {
    if (units.value.length > 0) {
      loading.value = true

      const { data, error } = await useFetch('/api/calculate', {
        method: 'post',
        body: units.value,
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
    units,
    loading,
    solution,
    hasSolution,
    isCalculated,
    solutionError,
    add,
    clear,
    removeById,
    generateAsync,
    calculateAsync,
  }
})
