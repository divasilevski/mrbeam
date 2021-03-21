<template lang="pug">
  .input-container
    input(
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    )

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['value'],
})
</script>
