<template>
  <div class="defenitions">
    <nav>
      <span
        v-for="defenition in defenitions"
        :key="defenition"
        :class="{ active: defenition === props.modelValue }"
        tabindex="0"
        @keypress.enter="emit('update:modelValue', defenition)"
        @click="emit('update:modelValue', defenition)"
      >
        <AppIcon :class="`icon-${defenition}`" :name="defenition" size="30" />
      </span>
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
  @apply flex items-center justify-center h-[46px] md:h-[42px];

  nav {
    @apply flex gap-2 px-2 border-complementary border rounded-full shadow-sm;

    span {
      @apply flex items-center justify-center p-2 cursor-pointer;

      .icon {
        @apply text-primaryLight;
      }

      .icon-simple {
        --icon-width: 35px;
        --icon-height: 35px;
      }

      .icon:hover {
        @apply text-primary;
      }
    }

    .active .icon {
      @apply text-primary;
    }
  }
}
</style>
