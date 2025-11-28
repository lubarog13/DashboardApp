<template>
  <div class="container dashboard-container">
    <div class="dashboard">
      <div class="dashboard__left">
        <div class="dashboard__left-header">
          <h2>Поиск документа</h2>
          <BaseInput v-model="search" type="text" placeholder="Введите ID документа" @input="onInput" />
          <h2>Результаты</h2>
        </div>
        <div class="dashboard__left-list" v-if="documentsStore.documents.length > 0">
          <DocumentItem v-for="document in documentsStore.documents" :key="document.id" :document="document"
            @click="clickDocument(document)" />
        </div>
        <div class="dashboard__left-list" v-else-if="errorMessage">
          <p class="dashboard__left-list-empty error-message">{{ errorMessage }}</p>
        </div>
        <div class="dashboard__left-list" v-else>
          <p class="dashboard__left-list-empty">Ничего не найдено</p>
        </div>

      </div>
      <div class="dashboard__right">
        <DocumentPreview />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoading, type ActiveLoader } from 'vue-loading-overlay'
import { ref } from 'vue'
import { useDocumentsStore } from '@/stores/documents'
import { onMounted } from 'vue'
import type { DashboardDocument } from '@/models/document'
import DocumentItem from '@/components/dashboard/DocumentItem.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import DocumentPreview from '@/components/dashboard/DocumentPreview.vue'
import debounce from 'debounce'

const loading = useLoading()
const loader = ref<ActiveLoader | null>(null)

const search = ref('')
const errorMessage = ref('')

const documentsStore = useDocumentsStore()

onMounted(async () => {
  await getDocuments()
})

const getDocuments = async (filter: string = '') => {
  showLoading()
  errorMessage.value = ''
  await documentsStore.getDocuments(filter, (error: string) => {
    errorMessage.value = error
    hideLoading()
  }, hideLoading)
}

const clickDocument = (document: DashboardDocument) => {
  documentsStore.selectedDocument = document
}

const showLoading = () => {
  loader.value = loading.show({
    container: document.body,
    color: '#000000',
    canCancel: true,
  })
}

const hideLoading = () => {
  if (loader.value) {
    loader.value.hide()
    loader.value = null
  }
}

const onInput = debounce((event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    search.value = event.target.value
    if (search.value.length > 0) {
      getDocuments(search.value)
    } else {
      getDocuments()
    }
  }
}, 500)
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  border-radius: var(--border-radius-big);
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px var(--shadow-color);
}

.dashboard-container {
  height: calc(100% - 75px);
  margin-top: 35px;
}

.dashboard__left {
  background: var(--secondary-color);
  padding: 27px 0 27px 0;
  width: 282px;
  display: flex;
  flex-direction: column;
}

.dashboard__right {
  flex: 1;
}

.dashboard__left-header {
  padding: 0 22px 0 20px;
}

.dashboard__left h2 {
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 14px;
}

:deep(.base-input) {
  margin-bottom: 29px;
}

.dashboard__left-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 22px 20px 20px;
  margin-top: 4px;
}

.dashboard__left-list-empty {
  color: var(--text-secondary-color);
}

.dashboard__left-list-empty.error-message {
  color: var(--danger-color);
}

@media (max-width: 768px) {
  .dashboard-container {
    margin-bottom: 35px;
    height: auto;
  }

  .dashboard {
    flex-direction: column;
    padding: 20px;
  }

  .dashboard__left {
    width: 100%;
    padding: 20px 0 20px 0;
  }

  :deep(.base-input) {
    margin-bottom: 20px;
  }

  .dashboard__left-header {
    padding: 0;
  }

  .dashboard__left-list {
    padding: 0 20px 20px 20px;
    flex-direction: row;
    overflow-x: auto;
    gap: 10px;

  }

}
</style>
