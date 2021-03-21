import { Unit } from '~/assets/scripts/units.types'

export const state = () => ({
  units: [] as Unit[],
})

export const mutations = {
  add(state: any, units: Unit[]) {
    state.units = [...units]
  },
  push(state: any, unit: Unit) {
    state.units = [unit, ...state.units]
  },
  remove(state: any, id: string) {
    state.units = state.units.filter((el: Unit) => el.id !== id)
  },
  clear(state: any) {
    state.units = []
  },
}
