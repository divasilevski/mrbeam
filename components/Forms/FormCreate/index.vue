<template lang="pug">
  div
    button(@click="formName = 'FormForce'") force
    button(@click="formName = 'FormMoment'") moment

    FormForce(v-if="formName === 'FormForce'")
    FormMoment(v-else)

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FormCreate',
  data() {
    return {
      formName: 'FormForce',
    }
  },
})
</script>
