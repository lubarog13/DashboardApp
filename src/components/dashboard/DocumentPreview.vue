<template>
  <div class="document-preview">
    <div class="document-preview__content" v-if="documentsStore.selectedDocument">
      <div class="document-preview__content-image"
        :class="{ 'document-preview__content-image-empty': !documentsStore.selectedDocument.image }">
        <img v-if="documentsStore.selectedDocument.image" :src="documentsStore.selectedDocument.image"
          :alt="documentsStore.selectedDocument.name" />
      </div>
      <div class="document-preview__content-info">
        <h2>{{ documentsStore.selectedDocument.name }}</h2>
        <div class="document-preview__content-info-actions">
          <BaseBtn type="primary" :isLoading="isDownloadLoading" @click="downloadDocument">Скачать</BaseBtn>
          <BaseBtn type="danger" :disabled="!documentsStore.selectedDocument.image" :isLoading="isDeleteLoading"
            @click="deleteDocument">Удалить</BaseBtn>
        </div>
        <h2>Описание</h2>
        <p>{{ documentsStore.selectedDocument.description }}</p>
      </div>
    </div>
    <div class="document-preview__content document-preview__content-empty" v-else>
      <p>Выберите документ, чтобы посмотреть его содержимое</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDocumentsStore } from '@/stores/documents'
import BaseBtn from '@/components/base/BaseBtn.vue'
import { ref } from 'vue'


const documentsStore = useDocumentsStore()
const isDownloadLoading = ref(false)
const isDeleteLoading = ref(false)



const deleteDocument = async () => {
  isDeleteLoading.value = true
  await documentsStore.deleteDocument(documentsStore.selectedDocument!, () => {
    isDeleteLoading.value = false
  })
}

const downloadDocument = async () => {
  isDownloadLoading.value = true
  await documentsStore.downloadDocument(documentsStore.selectedDocument!, () => {
    isDownloadLoading.value = false
  })
}

</script>

<style scoped>
.document-preview {
  width: 100%;
  height: 100%;
}

.document-preview__content {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 30px;
  gap: 60px;
  overflow-y: auto;
}

.document-preview__content-empty {
  align-items: center;
  justify-content: center;
  text-align: center;
}

.document-preview__content-empty p {
  color: var(--text-secondary-color);
}

.document-preview__content-image {
  width: calc(50% - 30px);
  border-radius: var(--border-radius-big);
  overflow: hidden;
  border: 1px solid var(--border-color);
  background: var(--white-color) url('@/assets/images/image_placeholder.svg') no-repeat center center;
  background-size: cover;
  height: fit-content;

  display: flex;
}

.document-preview__content-image-empty {
  height: 286px;
}

.document-preview__content-image img {
  width: 100%;
  height: auto;
  min-height: 200px;
  object-fit: cover;
}

.document-preview__content-info {
  width: calc(50% - 30px);
}

.document-preview__content-info h2 {
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 14px;
}

.document-preview__content-info p {
  color: var(--text-secondary-color);
}

.document-preview__content-info-actions {
  display: flex;
  gap: 17px;
  margin-bottom: 47px;
}

@media (max-width: 768px) {
  .document-preview__content {
    flex-direction: column;
    gap: 30px;
    padding: 20px;
  }

  .document-preview__content-image {
    width: 100%;
  }

  .document-preview__content-info {
    width: 100%;
  }

  .document-preview__content-info-actions {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
  }

  .document-preview__content-info-actions button {
    width: 100%;
  }
}
</style>
