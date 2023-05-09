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

const { height } = useWindowSize()
const isDrag = ref(false)
const draggbleRef = ref()

const dy = (value: number) => height.value - value

const getHeight = (isMax: boolean) => {
  return isMax ? dy(props.maxHeight) : dy(props.minHeight)
}

const { y } = useDraggable(draggbleRef, {
  initialValue: { x: 0, y: getHeight(props.ident) },
  onStart: () => {
    isDrag.value = true
  },
  onEnd: () => {
    isDrag.value = false
  },
})

const isMaxHeight = computed(() => {
  return y.value < height.value - (props.maxHeight + props.minHeight) / 2
})

const style = computed(() => {
  return {
    height: `${dy(y.value) || props.minHeight}px`,
    transform: `translateY(${props.ident ? 0 : props.minHeight}px)`,
  }
})

const toggleHeight = () => {
  y.value = getHeight(!isMaxHeight.value)
}

watch(toRef(props, 'ident'), () => {
  y.value = getHeight(props.ident)
})

watchEffect(() => {
  if (!isDrag.value) {
    y.value = getHeight(isMaxHeight.value)
  }
})
</script>

<style lang="postcss" scoped>
.sheet {
  @apply fixed bottom-0 left-0 right-0 m-auto max-w-4xl select-none touch-none;

  .float-button {
    @apply absolute right-10 -translate-y-[50%] z-10;
  }

  .content {
    @apply flex flex-col rounded-t-2xl bg-white shadow-bottomSheet;

    .controls {
      @apply flex;

      .draggable-area {
        @apply m-auto py-3 px-4 cursor-grab;
      }

      .draggable-thumb {
        @apply w-12 h-1 bg-secondary rounded-sm;
      }

      .close-sheet {
        @apply border-none p-3;
      }
    }

    .body {
      @apply flex flex-col flex-grow gap-4 h-full px-4 pt-4 overflow-y-auto;
    }
  }

  .content:not(.drag) {
    transition: height 0.5s, transform 0.5s;
  }
}
</style>
