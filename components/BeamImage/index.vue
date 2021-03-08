<template lang="pug">
  .beam-image
    canvas(id="beam" resize="true")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BeamImage',
  computed: {
    units() {
      return this.$store.state.units.units
    },
  },
  mounted(): void {
    if (!window) return
    const $canvas = document.getElementById('beam')

    const p = (window as any).paper as any
    p.setup($canvas)

    const onResize = () => {
      if (this.units.length) {
        p.project.clear()
        setTimeout(() => {
          // Check size
          const w = $canvas!.offsetWidth
          p.project.view.setViewSize(new p.Size(w, 150))

          const path = new p.Path()
          path.strokeColor = 'black'
          const start = new p.Point(0, 0)
          path.moveTo(start)
          path.lineTo(start.add([w, 150]))
          p.view.draw()
        })
      }
    }

    onResize()
    window.addEventListener('resize', onResize)

    this.$once('hook:destroy', () => {
      window.removeEventListener('resize', onResize)
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
