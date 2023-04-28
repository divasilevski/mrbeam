<template>
  <div class="item">
    <div class="item__values">
      <div>{{ unit.type }}</div>

      <div>
        <span><AppNumber :value="position.x1" /></span>
        <span v-if="position.x2">
          {{ ' ... ' }}
          <AppNumber :value="position.x2" />
        </span>
      </div>

      <div>
        <template v-if="Array.isArray(unit.value)">
          <span v-for="(value, index) in unit.value" :key="value">
            <AppNumber :value="value" />
            <span v-if="index !== unit.value.length - 1"> ... </span>
          </span>
        </template>
        <template v-else>
          <AppNumber :value="unit.value" />
        </template>
      </div>
      <AppButton @click="remove">Remove</AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const store = useUnitsStore()

const props = defineProps({
  unit: {
    type: Object as () => Unit,
    required: true,
  },
})
const { unit } = toRefs(props)

const remove = () => {
  store.removeById(unit.value.id)
}

const position = computed(() => {
  return {
    x1: Array.isArray(props.unit.x) ? props.unit.x[0] : props.unit.x,
    x2: Array.isArray(props.unit.x) && props.unit.x[1],
  }
})
</script>

<style lang="postcss" scoped>
.item {
  @apply flex items-center py-2 px-4 rounded-lg border-gray-100 border-[1px];

  .item__values {
    @apply grid gap-4 w-full;
    grid-template-columns: 100px 1fr 1fr auto;
  }
}
</style>
