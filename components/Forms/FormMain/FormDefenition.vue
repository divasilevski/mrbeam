<template lang="pug">
  form
    fieldset
      label type
      br
      select(v-model="value.type")
        option simple
        option fixed
        option hinge
    fieldset
      label x
      InputText(v-model="value.x")

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
