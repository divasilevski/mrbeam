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
        <Simplebar style="height: 100%" :class="{ collapsed: isCollapsed }">
          <slot />
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
const isCollapsed = computed(() => {
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

<style lang="scss" scoped>
.sheet {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  margin: auto;
  max-width: 56rem;
  user-select: none;
  touch-action: none;

  .float-button {
    position: absolute;
    right: 2.5rem;
    z-index: 10;
    transform: translateY(-50%);
  }

  .content {
    display: flex;
    flex-direction: column;
    border-radius: 1rem 1rem 0 0;
    background: var(--color-background);
    box-shadow: var(--shadow-bottom-sheet);

    .controls {
      display: flex;

      .draggable-area {
        margin: auto;
        padding: 0.75rem 1rem;
        cursor: grab;
      }

      .draggable-thumb {
        width: 3rem;
        height: 0.25rem;
        border-radius: 0.125rem;
        background: var(--color-tertiary-light);
      }

      .close-sheet {
        padding: 0.75rem;
        border-style: none;
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 1rem;
      height: 100%;
      padding: 1rem 1rem 0;
      overflow-y: auto;
    }
  }

  .content:not(.dragging) {
    transition:
      height 0.5s,
      transform 0.5s;
  }
}

/* Fix simplebar */
[data-simplebar].collapsed {
  overflow: hidden;
}

[data-simplebar]:not(.collapsed) :deep(.simplebar-track) {
  opacity: 0.3;
  transition: opacity var(--duration-fast) var(--ease-standard) 500ms;
}

[data-simplebar].collapsed :deep(.simplebar-track) {
  opacity: 0;
}

[data-simplebar]:deep(.simplebar-track) {
  z-index: 10;
  width: 9px;
}
</style>
