<template lang="pug">
  .content
    h1 Создаем балку!
    h2 Сгенерированный с бэка лист юнитов
    UnitList
</template>

<script lang="ts">
import Vue from 'vue'
import api from 'assets/scripts/api'

export default Vue.extend({
  async asyncData({ $axios, store }) {
    const response = await api.generate($axios)
    store.commit('units/add', response)
  },
})
</script>

<style lang="scss" scoped>
.content {
  overflow: auto;
  height: 100%;
}
</style>
