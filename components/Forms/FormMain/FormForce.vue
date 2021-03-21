<template lang="pug">
  form
    fieldset
      label x
      InputText(v-model="value.x")
    fieldset
      label P
      InputText(v-model="value.P")

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
