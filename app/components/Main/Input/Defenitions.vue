<template>
  <div class="defenitions">
    <nav>
      <span
        v-for="defenition in defenitions"
        :key="defenition"
        :class="{ active: defenition === props.modelValue }"
        tabindex="0"
        @keydown.enter="emit('update:modelValue', defenition)"
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

<style lang="scss">
.defenitions {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;

  @media (min-width: 768px) {
    height: 42px;
  }

  nav {
    display: flex;
    gap: 0.5rem;
    padding: 0 0.5rem;
    border-width: 1px;
    border-color: var(--color-complementary);
    border-radius: 9999px;
    box-shadow: var(--shadow-sm);

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      cursor: pointer;

      .icon {
        color: var(--color-primary-light);
      }

      .icon-simple {
        --icon-width: 35px;
        --icon-height: 35px;
      }

      .icon:hover {
        color: var(--color-primary);
      }
    }

    .active .icon {
      color: var(--color-primary);
    }
  }
}
</style>
