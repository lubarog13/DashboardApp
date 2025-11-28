<template>
  <button class="base-btn" :class="classList" v-bind="$attrs" :aria-label="$attrs.ariaLabel as string || 'Button'">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
  isLoading?: boolean
}>(), {
  type: 'primary',
  isLoading: false
})

const classList = computed(() => {
  const list = ['base-btn', props.type]
  if (props.isLoading) {
    list.push('base-btn--loading')
  }
  return list.join(' ')
})
</script>

<style scoped>
.base-btn {
  padding: 7px 28px;
  border: 1px solid;
  border-radius: var(--border-radius);
  background-color: transparent;
  box-shadow: none;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.base-btn:hover,
.base-btn:focus {
  opacity: 0.8;
}

.base-btn.primary {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.base-btn.secondary {
  border-color: var(--secondary-color);
  color: var(--secondary-color);
}

.base-btn.danger {
  border-color: var(--danger-color);
  color: var(--danger-color);
}

.base-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
