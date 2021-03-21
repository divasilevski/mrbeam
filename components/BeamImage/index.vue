<template lang="pug">
.beam-image
  canvas#beam(resize='true')
</template>

<script lang="ts">
import Vue from 'vue'
import PaperBeam from './beam-image.paper'

export default Vue.extend({
  name: 'BeamImage',
  computed: {
    units() {
      return this.$store.state.units.units
    },
  },
  mounted(): void {
    if (!window) return
    const $canvas = document.getElementById('beam') as HTMLCanvasElement
    const paperjs = new paper.Project($canvas)
    const paperBeam = new PaperBeam(75, 40)

    const reDraw = () => {
      paperjs.clear()
      if (this.units.length) {
        setTimeout(() => {
          const w = $canvas!.offsetWidth
          paperBeam.createBeam(this.units, w)
        })
      }
    }

    setTimeout(reDraw)
    window.addEventListener('resize', reDraw)
    this.$watch('units', reDraw)

    this.$once('hook:destroy', () => {
      window.removeEventListener('resize', reDraw)
    })
  },
})
</script>

<style lang="scss" scoped>
.beam-image {
  height: 150px;
  width: 100%;
  border: 1px dashed gray;

  canvas[resize] {
    width: 100%;
    height: 100%;
  }
}
</style>
