<template lang="pug">
  .container
    h1 Hello world!
    button(@click="click") Click
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    click() {
      if ((this.$nuxt as any).$colorMode.preference === 'light') {
        ;(this.$nuxt as any).$colorMode.preference = 'dark'
      } else {
        ;(this.$nuxt as any).$colorMode.preference = 'light'
      }
    },
  },
})
</script>

<style lang="scss"></style>
