<template>
  <form @submit.prevent>
    <div v-show="props.tab === 'force'" class="inputs">
      <AppInput id="force:x" v-model.number="models.x" label="X" />
      <AppInput id="force:p" v-model.number="models.p" label="P" />
    </div>

    <div v-show="props.tab === 'moment'" class="inputs">
      <AppInput id="moment:x" v-model.number="models.x" label="X" />
      <AppInput id="moment:m" v-model.number="models.m" label="M" />
    </div>

    <div v-show="props.tab === 'distload'" class="inputs">
      <AppInput id="dist:x" v-model.number="models.x" label="X0" />
      <AppInput id="dist:x1" v-model.number="models.x1" label="X1" />
      <AppInput id="dist:q0" v-model.number="models.q0" label="Q" />
    </div>

    <div v-show="props.tab == 'defenition'" class="inputs">
      <MainInputDefenitions v-model="defenition" />
      <AppInput id="def:x" v-model="models.x" label="X"></AppInput>
    </div>

    <div v-show="props.tab === 'material'" class="inputs">
      <AppInput id="mat:x" v-model.number="models.x" label="X0" />
      <AppInput id="mat:x1" v-model.number="models.x1" label="X1" />
      <AppInput id="mat:e" v-model.number="models.e" label="E" />
      <AppInput id="mat:j" v-model.number="models.j" label="J" />
      <AppInput id="mat:a" v-model.number="models.a" label="A" />
    </div>

    <AppButton type="submit" @click="addUnit">Add element</AppButton>
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

const models = reactive({ x: 0, p: 0, x1: 0, q0: 0, m: 0, e: 1, j: 1, a: 1 })
const defenition = ref<'simple' | 'hinge' | 'fixed'>('simple')

const addUnit = () => {
  switch (props.tab) {
    case 'force':
      store.add({
        id: nanoid(),
        type: 'force',
        x: models.x,
        value: models.p,
      })
      break
    case 'moment':
      store.add({
        id: nanoid(),
        type: 'moment',
        x: models.x,
        value: models.m,
      })
      break
    case 'distload':
      store.add({
        id: nanoid(),
        type: 'distload',
        x: [models.x, models.x1],
        value: models.q0,
      })
      break
    case 'defenition':
      store.add({
        id: nanoid(),
        type: defenition.value,
        x: [models.x],
      })
      break
    case 'material':
      store.add({
        id: nanoid(),
        type: 'material',
        x: [models.x, models.x1],
        value: [models.e, models.j, models.a],
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
  @apply flex flex-col gap-4;
}
</style>
