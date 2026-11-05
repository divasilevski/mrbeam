<template>
  <div class="item">
    <div class="values">
      <div class="unit-icon">
        <AppIcon :name="props.unit.type" />
      </div>

      <AppNumber :value="props.unit.x" />

      <div>
        <template v-if="props.unit.value && symbol">
          <span class="symbol" v-html="symbol + '&nbsp;&nbsp;'" />
          <AppNumber :value="props.unit.value" />
        </template>
      </div>

      <AppIconButton name="close" @click="onRemove">Remove</AppIconButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  unit: {
    type: Object as () => Unit,
    required: true,
  },
})

const { removeUnit } = useBeam()

const symbol = computed(() => {
  switch (props.unit.type) {
    case 'force':
      return toMathSymbol('F')
    case 'moment':
      return toMathSymbol('M')
    case 'distload':
      return toMathSymbol('q')
    case 'material':
      return toMathSymbol('EI')
    default:
      return ''
  }
})

const onRemove = () => {
  removeUnit(props.unit.id)
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-width: 1px;
  border-style: dashed;
  border-color: var(--color-complementary);
  border-radius: 9999px;

  .values {
    display: grid;
    grid-template-columns: 50px 1fr 1fr auto;
    gap: 1rem;
    align-items: center;
    width: 100%;

    @media (min-width: 640px) {
      grid-template-columns: 100px 1fr 1fr auto;
    }

    .symbol {
      font-size: 18px;
    }

    .unit-icon {
      display: flex;
      align-items: center;
      width: 3rem;

      .icon {
        --icon-width: 2rem;
        --icon-height: 1.5rem;
      }
    }
  }
}
</style>
