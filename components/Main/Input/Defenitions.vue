<template>
  <div class="defenitions">
    <nav>
      <a
        v-for="defenition in defenitions"
        :key="defenition"
        :class="{ active: defenition === props.modelValue }"
        @click="emit('update:modelValue', defenition)"
      >
        <AppIcon :name="defenition" />
      </a>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const defenitions = ['simple', 'fixed', 'hinge']

const props = defineProps({
  modelValue: {
    type: String,
    default: 'simple',
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="postcss">
.defenitions {
  @apply flex items-center justify-center h-[42px];

  nav {
    @apply flex gap-2 px-2 border-gray-100 border-dashed border-[1px] rounded-full shadow-inner;

    a {
      @apply flex items-center justify-center p-2 cursor-pointer;

      svg {
        @apply text-gray-400;
      }
      svg:hover {
        @apply text-primary;
      }
    }

    .active svg {
      @apply text-primary;
    }
  }
}
</style>
