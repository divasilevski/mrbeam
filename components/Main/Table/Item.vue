<template>
  <div class="item">
    <div class="values">
      <div class="icon">
        <AppIcon :name="props.unit.type" />
      </div>

      <AppNumber :value="props.unit.x" />

      <div>
        <template v-if="props.unit.value && symbol">
          <span class="symbol">{{ symbol + '&nbsp;&nbsp;' }}</span>
          <AppNumber :value="props.unit.value" />
        </template>
      </div>

      <AppIconButton name="close" @click="onRemove">Remove</AppIconButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const props = defineProps({
  unit: {
    type: Object as () => Unit,
    required: true,
  },
})

const store = useUnitsStore()

const symbol = computed(() => {
  switch (props.unit.type) {
    case 'force':
      return 'P'
    case 'moment':
      return 'M'
    case 'distload':
      return 'Q'
    case 'material':
      return 'EJ'
    default:
      return ''
  }
})

const onRemove = () => {
  store.removeById(props.unit.id)
}
</script>

<style lang="postcss" scoped>
.item {
  @apply flex items-center py-1 px-3 rounded-full border border-complementary;

  .values {
    @apply grid grid-cols-[50px,1fr,1fr,auto] sm:grid-cols-[100px,1fr,1fr,auto] gap-4 items-center w-full;

    .icon {
      @apply flex items-center w-12;

      svg {
        @apply h-6 w-8;
      }
    }

    .symbol {
      @apply font-semibold;
    }
  }
}
</style>
