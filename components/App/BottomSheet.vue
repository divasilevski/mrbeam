<template>
  <div class="sheet" :style="sheetStyle">
    <div class="float-button">
      <slot name="float">
        <span @click="toggleStatus">Toggle</span>
      </slot>
    </div>

    <div
      class="content"
      :class="{ dragging: isDragging }"
      :style="[heightStyle, transformStyle]"
    >
      <header ref="draggableRef" class="controls">
        <div class="draggable-area">
          <div class="draggable-thumb" />
        </div>
      </header>

      <div class="body">
        <Simplebar style="height: 100%" :class="{ сollapsed: isСollapsed }">
          <slot></slot>
        </Simplebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
enum Status {
  MinHeight = 'MinHeight',
  MaxHeight = 'MaxHeight',
}

const props = defineProps({
  hasIdent: {
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

const draggableRef = ref()
const status = ref(Status.MinHeight)

const dy = (value: number) => height.value - value

const onEnd = () => {
  if (!isChangeToMax.value) {
    status.value = Status.MinHeight
    y.value = dy(props.minHeight)
  } else {
    status.value = Status.MaxHeight
    y.value = dy(props.maxHeight)
  }
}

const { y, isDragging } = useDraggable(draggableRef, {
  initialValue: { x: 0, y: dy(props.minHeight) },
  axis: 'y',
  onEnd,
})

// to template
const isСollapsed = computed(() => {
  return status.value === Status.MinHeight
})

const heightStyle = computed(() => {
  if (isDragging.value) return `height: ${dy(y.value)}px`

  return status.value === Status.MaxHeight
    ? `height: ${props.maxHeight}px`
    : `height: ${props.minHeight}px`
})

const sheetStyle = computed(() => {
  return props.hasIdent ? 'pointer-events: auto' : 'pointer-events: none'
})

const transformStyle = computed(() => {
  return `transform: translateY(${props.hasIdent ? 0 : props.minHeight}px)`
})

// to expose
const isChangeToMax = computed(() => {
  if (status.value === Status.MaxHeight) {
    return y.value < dy(props.maxHeight - 100)
  } else {
    return y.value < dy(props.minHeight + 100)
  }
})

const toggleStatus = () => {
  if (isChangeToMax.value) {
    status.value = Status.MinHeight
    y.value = dy(props.minHeight)
  } else {
    status.value = Status.MaxHeight
    y.value = dy(props.maxHeight)
  }
}

watch(height, () => {
  if (status.value === Status.MaxHeight) {
    y.value = dy(props.maxHeight)
  } else {
    y.value = dy(props.minHeight)
  }
})

defineExpose({ Status, status, toggleStatus, isChangeToMax })
</script>

<style lang="postcss" scoped>
.sheet {
  @apply fixed bottom-0 left-0 right-0 m-auto max-w-4xl select-none touch-none z-20;

  .float-button {
    @apply absolute right-10 -translate-y-[50%] z-10;
  }

  .content {
    @apply flex flex-col rounded-t-2xl bg-background shadow-bottomSheet;

    .controls {
      @apply flex;

      .draggable-area {
        @apply m-auto py-3 px-4 cursor-grab;
      }

      .draggable-thumb {
        @apply w-12 h-1 bg-tertiaryLight rounded-sm;
      }

      .close-sheet {
        @apply border-none p-3;
      }
    }

    .body {
      @apply flex flex-col flex-grow gap-4 h-full px-4 pt-4 overflow-y-auto;
    }
  }

  .content:not(.dragging) {
    transition: height 0.5s, transform 0.5s;
  }
}

/* Fix simplebar */
[data-simplebar].сollapsed {
  overflow: hidden;
}

[data-simplebar]:not(.сollapsed) :deep(.simplebar-track) {
  @apply opacity-30 transition-opacity delay-500;
}

[data-simplebar].сollapsed :deep(.simplebar-track) {
  @apply opacity-0;
}

[data-simplebar]:deep(.simplebar-track) {
  @apply w-[9px] z-10;
}
</style>
