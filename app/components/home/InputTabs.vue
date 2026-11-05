<template>
  <div class="tabs">
    <div class="tablist" role="tablist">
      <span
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: tab === props.modelValue }"
        role="tab"
        tabindex="0"
        @keydown.enter="emit('update:modelValue', tab)"
        @click="emit('update:modelValue', tab)"
      >
        <AppIcon :class="`icon-${tab}`" :name="tab" size="30" />
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

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  justify-content: center;

  .tablist {
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

      .icon-defenition {
        --icon-width: 35px;
        --icon-height: 35px;
      }

      .icon-distload {
        --icon-width: 40px;
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
