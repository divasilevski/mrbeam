<template lang="pug">
  form
    fieldset
      label x0
      InputText(v-model="value.x1")
    fieldset
      label x1
      InputText(v-model="value.x2")
    fieldset
      label E
      InputText(v-model="value.E")
    fieldset
      label J
      InputText(v-model="value.J")
    fieldset
      label A
      InputText(v-model="value.A")

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