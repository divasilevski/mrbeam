<template lang="pug">
  .unit-item
    .unit-item__content
      span {{ unit.type }}
      span {{ unit.x }}
      span(v-if="unit.value") {{ unit.value }}

    .unit-item__close(@click="$emit('remove', unit.id)") x

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    unit: {
      type: Object,
      default: () => ({
        id: 'id',
        x: 0,
        type: 'point',
        value: '',
      }),
    },
  },
})
</script>

<style lang="scss" scoped>
.unit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  border: 1px solid gray;

  .unit-item__content {
    display: flex;
    align-items: center;

    & :not(:last-child) {
      margin-right: 15px;
    }
  }

  .unit-item__close {
    cursor: pointer;
  }
}
</style>
