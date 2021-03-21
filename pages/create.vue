<template lang="pug">
.content
  button(@click='random') RandomBeam
  BeamImage
  br
  FormMain
  br
  UnitList
</template>

<script lang="ts">
import Vue from 'vue'
import api from 'assets/scripts/api'

export default Vue.extend({
  methods: {
    async random() {
      const response = await api.generate(this.$axios)
      this.$store.commit('units/add', response)
    },
  },
})
</script>

<style lang="scss" scoped>
.content {
  overflow: auto;
  height: 100%;
}
</style>
