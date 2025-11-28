<template>
  <div class="document-item" @click="clickDocument">
    <div class="document-item__image">
      <img v-if="document.image" :src="document.image" loading="lazy" :alt="document.name" />
    </div>
    <div class="document-item__info">
      <h3>{{ document.name }}</h3>
      <p>{{ document.getSize() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardDocument } from '@/models/document'

defineProps<{
  document: DashboardDocument
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const clickDocument = () => {
  emit('click')
}
</script>

<style scoped>
.document-item {
  display: flex;
  border-radius: var(--border-radius-big);
  background: var(--white-color);
  box-shadow: 0px 0px 10px 0px var(--shadow-color);
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
  overflow: hidden;
  cursor: pointer;
}

.document-item__image {
  width: 70px;
  height: 70px;
  border-right: 1px solid var(--border-color);
  background: var(--white-color) url('@/assets/images/image_placeholder.svg') no-repeat center center;
  background-size: cover;


}

.document-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.document-item__image img::before {
  font-size: 0;
}

.document-item__info h3 {
  font-weight: 600;
  color: var(--text-dark-color);
  margin-bottom: 6px;
}

.document-item__info p {
  color: var(--text-secondary-color);
}

.document-item:hover {
  background: var(--primary-color);
}

.document-item:hover .document-item__info h3 {
  color: var(--white-color);
}

.document-item:hover .document-item__info p {
  color: var(--white-color);
}

@media (max-width: 768px) {
  .document-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .document-item__image {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }

  .document-item__info {
    padding: 16px;
  }
}
</style>
