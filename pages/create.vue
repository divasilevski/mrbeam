<template lang="pug">
  .content
    h1 Создаем балку!
    h2 Генерация
    pre {{ response }}
</template>

<script lang="ts">
import Vue from 'vue'
import api from 'assets/scripts/api'

export default Vue.extend({
  async asyncData({ $axios, store }) {
    const response = await api.generate($axios)
    store.commit('units/add', response)
  },
  computed: {
    response() {
      return this.$store.state.units.units
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
