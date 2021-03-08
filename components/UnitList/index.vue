<template lang="pug">
  .unit-list
    UnitItem(
      v-for="unit in units"
      :key="unit.id"
      :unit="unit"
      @remove="remove"
    )


</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UnitList',
  computed: {
    units() {
      return this.$store.state.units.units
    },
  },
  methods: {
    remove(id: string) {
      this.$store.commit('units/remove', id)
    },
  },
})
</script>
