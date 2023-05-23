<template>
  <form @submit.prevent>
    <div v-show="props.tab === 'force'" class="inputs">
      <AppNumberInput id="force:x" v-model="models.x0" label="X" />
      <AppNumberInput id="force:p" v-model="models.p" label="P" />
    </div>

    <div v-show="props.tab === 'moment'" class="inputs">
      <AppNumberInput id="moment:x" v-model="models.x0" label="X" />
      <AppNumberInput id="moment:m" v-model="models.m" label="M" />
    </div>

    <div v-show="props.tab === 'distload'" class="inputs">
      <div class="row">
        <AppNumberInput id="dist:x" v-model="models.x0" label="X<sub>0</sub>" />
        <AppNumberInput
          id="dist:x1"
          v-model="models.x1"
          label="X<sub>1</sub>"
        />
      </div>
      <AppNumberInput id="dist:q0" v-model="models.q" label="Q" />
    </div>

    <div v-show="props.tab == 'defenition'" class="inputs">
      <MainInputDefenitions v-model="defenition" />
      <AppNumberInput id="def:x" v-model="models.x0" label="X" />
    </div>

    <AppButton type="submit" @click="addUnit">
      <AppIcon name="plus" />
      Add element
      <AppIcon name="plus" />
    </AppButton>
  </form>
</template>

<script lang="ts" setup>
import { nanoid } from 'nanoid'
import { useUnitsStore } from '~/stores/useUnitsStore'

const store = useUnitsStore()

const props = defineProps({
  tab: {
    type: String,
    default: 'force',
  },
})

const models = reactive({ x0: '0', x1: '0', p: '0', q: '0', m: '0' })
const defenition = ref<'simple' | 'hinge' | 'fixed'>('simple')

const addUnit = () => {
  const values: Record<string, number> = {}

  Object.keys(models).forEach((key) => {
    const modelsKey = key as keyof typeof models
    values[key] = Number.parseFloat(models[modelsKey])
  })

  const addUnit = (unit: Unit) => {
    const pointUnit: Unit = { id: unit.id, type: 'point', x: unit.x }
    store.add(unit.value ? unit : pointUnit)
  }

  switch (props.tab) {
    case 'force':
      addUnit({
        id: nanoid(),
        type: 'force',
        x: values.x0,
        value: values.p,
      })
      break
    case 'moment':
      addUnit({
        id: nanoid(),
        type: 'moment',
        x: values.x0,
        value: values.m,
      })
      break
    case 'distload':
      addUnit({
        id: nanoid(),
        type: 'distload',
        x: [values.x0, values.x1],
        value: values.q,
      })
      break
    case 'defenition':
      store.add({
        id: nanoid(),
        type: defenition.value,
        x: values.x0,
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
