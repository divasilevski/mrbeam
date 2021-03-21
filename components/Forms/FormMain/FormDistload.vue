<template lang="pug">
  form
    fieldset
      label x0
      InputText(v-model="value.x1")
    fieldset
      label x1
      InputText(v-model="value.x2")
    fieldset
      label P1
      InputText(v-model="value.P1")
    fieldset
      label P2
      InputText(v-model="value.P2")

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>
