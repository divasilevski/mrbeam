<template>
  <div class="rounded-full" @click.stop="open()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['image'])

const { open, reset, onChange } = useFileDialog({
  accept: '.jpeg,.png,.jpg',
})

onChange((files) => {
  if (files && files.length) {
    emit('image', files[0])
  }
  reset()
})
</script>
