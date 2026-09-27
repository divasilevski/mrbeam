<template>
  <div class="item">
    <div class="values">
      <div class="icon">
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

const store = useMainStore()

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
  store.removeUnit(props.unit.id)
}
</script>

<style lang="postcss" scoped>
.item {
  @apply flex items-center py-1 px-3 rounded-full border border-dashed border-complementary;

  .values {
    @apply grid grid-cols-[50px,1fr,1fr,auto] sm:grid-cols-[100px,1fr,1fr,auto]
      gap-4 items-center w-full;

    .symbol {
      @apply text-[18px];
    }

    .icon {
      @apply flex items-center w-12;

      svg {
        @apply h-6 w-8;
      }
    }
  }
}
</style>
