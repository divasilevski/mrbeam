<template>
  <div class="sheet">
    <div class="float-button">
      <slot
        name="float"
        :toggle-height="toggleHeight"
        :is-max-height="isMaxHeight"
      >
        <span @click="toggleHeight">Toggle</span>
      </slot>
    </div>

    <div class="content" :class="{ drag: isDrag }" :style="style">
      <header class="controls">
        <div ref="draggbleRef" class="draggable-area">
          <div class="draggable-thumb" />
        </div>
      </header>

      <div class="body">
        <Simplebar style="height: 100%">
          <slot></slot>
        </Simplebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

const props = defineProps({
  ident: {
    type: Boolean,
    default: false,
  },
  maxHeight: {
    type: Number,
    default: 1000,
  },
  minHeight: {
    type: Number,
    default: 64,
  },
})

// -------------------------------

const { height } = useWindowSize()
const isDrag = ref(false)
const draggbleRef = ref()

const { y } = useDraggable(draggbleRef, {
  initialValue: {
    x: 0,
    y: props.ident
      ? height.value - props.maxHeight
      : height.value - props.minHeight,
  },
  onStart: () => {
    isDrag.value = true
  },
  onEnd: () => {
    isDrag.value = false
  },
})

// -------------------------------

const style = computed(() => {
  return {
    height: `${height.value - y.value || props.minHeight}px`,
    transform: `translateY(${props.ident ? 0 : props.minHeight}px)`,
  }
})

watch(toRef(props, 'ident'), () => {
  if (props.ident) {
    y.value = height.value - props.maxHeight
  } else {
    y.value = height.value - props.minHeight
  }
})

const toggleHeight = () => {
  if (y.value === height.value - props.minHeight) {
    y.value = height.value - props.maxHeight
  } else {
    y.value = height.value - props.minHeight
  }
}

const isMaxHeight = computed(() => {
  return y.value < height.value - (props.maxHeight + props.minHeight) / 2
})

watchEffect(() => {
  if (!isDrag.value) {
    const top = height.value - props.maxHeight
    const bot = height.value - props.minHeight

    if (isMaxHeight.value) {
      y.value = top
    } else {
      y.value = bot
    }
  }
})
</script>

<style lang="postcss" scoped>
.sheet {
  @apply fixed bottom-0 left-0 right-0 m-auto max-w-4xl select-none touch-none;

  .float-button {
    @apply absolute right-8 -translate-y-4 z-10;
  }

  .content {
    @apply flex flex-col rounded-t-2xl max-h-[100vh] h-[30vh] bg-gray-200;

    .controls {
      @apply flex;

      .draggable-area {
        @apply w-12 m-auto p-4 cursor-grab;
      }

      .draggable-thumb {
        @apply w-12 h-1 bg-slate-500 rounded-sm;
      }

      .close-sheet {
        @apply border-none p-3;
      }
    }

    .body {
      @apply flex flex-col flex-grow gap-4 h-full p-4 overflow-y-auto;
    }
  }

  .content:not(.drag) {
    transition: height 0.5s, transform 0.5s;
  }
}
</style>
