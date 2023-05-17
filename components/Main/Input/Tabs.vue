<template>
  <div class="tabs">
    <div class="tablist" role="tablist">
      <span
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: tab === props.modelValue }"
        role="tab"
        tabindex="0"
        @keypress.enter="emit('update:modelValue', tab)"
        @click="emit('update:modelValue', tab)"
      >
        <AppIcon :name="tab" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const tabs = ['force', 'moment', 'distload', 'defenition']

const props = defineProps({
  modelValue: {
    type: String,
    default: 'force',
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="postcss" scoped>
.tabs {
  @apply flex items-center justify-center;

  .tablist {
    @apply flex gap-2 px-2 border-secondary-light border rounded-full shadow-sm;

    span {
      @apply flex items-center justify-center p-2 cursor-pointer rounded-full;

      svg {
        @apply text-secondary;
      }
      svg:hover {
        @apply text-accent;
      }
    }

    .active svg {
      @apply text-accent;
    }
  }
}
</style>
