<template lang="pug">
div
  button(
    v-for="{component} in tabs" :key="component"
    @click="current = component; form = {}"
    v-text="component"
  )

  components(:is="current" v-model="models")

  button(@click="addUnit") Добавить
</template>

<script lang="ts">
import Vue from 'vue'
import Force from './FormForce.vue'
import Moment from './FormMoment.vue'
import Distload from './FormDistload.vue'
import Defenition from './FormDefenition.vue'
import Material from './FormMaterial.vue'

const tabs = [
  { component: 'Force' },
  { component: 'Moment' },
  { component: 'Distload' },
  { component: 'Defenition' },
  { component: 'Material' },
]

export default Vue.extend({
  components: {
    Force,
    Moment,
    Distload,
    Defenition,
    Material,
  },
  data() {
    return {
      tabs,
      current: 'Force',
      models: {} as any,
    }
  },
  methods: {
    addUnit() {
      switch (this.current) {
        case 'Force':
          this.$store.commit('units/push', {
            id: Date.now(),
            type: this.current.toLowerCase(),
            x: this.models.x,
            value: this.models.P,
          })
          break
        case 'Moment':
          this.$store.commit('units/push', {
            id: Date.now(),
            type: this.current.toLowerCase(),
            x: this.models.x,
            value: this.models.M,
          })
          break
        case 'Distload':
          this.$store.commit('units/push', {
            id: Date.now(),
            type: this.current.toLowerCase(),
            x: [this.models.x1, this.models.x2],
            value: [this.models.P1, this.models.P2],
          })
          break
        case 'Defenition':
          this.$store.commit('units/push', {
            id: Date.now(),
            type: this.models.type,
            x: this.models.x,
          })
          break
        case 'Material':
          this.$store.commit('units/push', {
            id: Date.now(),
            type: this.current.toLowerCase(),
            x: [this.models.x1, this.models.x2],
            value: [this.models.E, this.models.E, this.models.E],
          })
          break
        default:
          break
      }
    },
  },
})
</script>
