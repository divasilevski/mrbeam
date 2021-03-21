<template lang="pug">
  form
    fieldset
      label x
      InputText(v-model="value.x")
    fieldset
      label M
      InputText(v-model="value.M")

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
