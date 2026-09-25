<template>
  <form @submit.prevent>
    <div v-show="props.tab === 'force'" class="inputs">
      <AppNumberInput
        id="force:x"
        v-model="models.X0"
        :label="toMathSymbol('x')"
      />
      <AppNumberInput
        id="force:p"
        v-model="models.F"
        :label="toMathSymbol('F')"
        hint="Concentrated force"
      />
    </div>

    <div v-show="props.tab === 'moment'" class="inputs">
      <AppNumberInput
        id="moment:x"
        v-model="models.X0"
        :label="toMathSymbol('x')"
      />
      <AppNumberInput
        id="moment:m"
        v-model="models.M"
        :label="toMathSymbol('M')"
        hint="Bending moment"
      />
    </div>

    <div v-show="props.tab === 'distload'" class="inputs">
      <div class="row">
        <AppNumberInput
          id="dist:x"
          v-model="models.X1"
          :label="toMathSymbol('x') + '&#x2080;'"
        />
        <AppNumberInput
          id="dist:x1"
          v-model="models.X0"
          :label="toMathSymbol('x') + '&#x2081;'"
        />
      </div>
      <AppNumberInput
        id="dist:q0"
        v-model="models.Q"
        :label="toMathSymbol('q')"
        hint="Distributed load"
      />
    </div>

    <div v-show="props.tab == 'defenition'" class="inputs">
      <MainInputDefenitions v-model="defenition" />
      <AppNumberInput
        id="def:x"
        v-model="models.X0"
        :label="toMathSymbol('x')"
      />
    </div>

    <AppButton type="submit" @click="addUnit">ADD ELEMENT</AppButton>
  </form>
</template>

<script lang="ts" setup>
import { nanoid } from 'nanoid'

type ModelsKeys = keyof typeof models

const store = useMainStore()

const props = defineProps({
  tab: {
    type: String,
    default: 'force',
  },
})

const models = reactive({ X0: '0', X1: '0', F: '0', Q: '0', M: '0' })
const defenition = ref<'simple' | 'hinge' | 'fixed'>('simple')

const addUnit = () => {
  const values = {} as Record<ModelsKeys, number>

  for (const key of Object.keys(models) as ModelsKeys[]) {
    values[key] = Number.parseFloat(models[key])
  }

  const add = (unit: Unit) => {
    const pointUnit: Unit = { id: unit.id, type: 'point', x: unit.x }
    store.addUnit(unit.value ? unit : pointUnit)
  }

  switch (props.tab) {
    case 'force':
      add({
        id: nanoid(8),
        type: 'force',
        x: values.X0,
        value: values.F,
      })
      break
    case 'moment':
      add({
        id: nanoid(8),
        type: 'moment',
        x: values.X0,
        value: values.M,
      })
      break
    case 'distload':
      add({
        id: nanoid(8),
        type: 'distload',
        x: [values.X0, values.X1].sort((a, b) => a - b),
        value: values.Q,
      })
      break
    case 'defenition':
      store.addUnit({
        id: nanoid(8),
        type: defenition.value,
        x: values.X0,
      })
      break
    default:
      break
  }
}
</script>

<style lang="postcss" scoped>
form,
.inputs {
  @apply flex flex-col items-center justify-center gap-4;
}

.row {
  @apply flex gap-4;
}

button {
  @apply mt-2;
}
</style>
