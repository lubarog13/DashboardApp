import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import { DashboardDocument } from '@/models/document'
const baseUrlApi = import.meta.env.VITE_BACKEND_URL

export const useDocumentsStore = defineStore('documents', () => {
  const documents = ref<DashboardDocument[]>([])
  const selectedDocument = ref<DashboardDocument | null>(null)

  const getDocuments = async (
    filter: string = '',
    onError: (error: string) => void,
    onFinish: () => void,
  ) => {
    const url = filter ? `${baseUrlApi}/user/docs?search=${filter}` : `${baseUrlApi}/user/docs`
    await axios
      .get(url)
      .then((response) => {
        documents.value = response.data.map(
          (doc: DashboardDocument) =>
            new DashboardDocument(doc.id, doc.name, doc.description, doc.image),
        )
        onFinish()
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          onError(
            (error.response?.data as { message?: string })?.message ||
              'Ошибка при загрузке документов',
          )
        } else {
          onError('Ошибка при загрузке документов')
        }
      })
      .finally(() => {
        onFinish()
      })
  }

  const downloadDocument = async (doc: DashboardDocument, onFinish: () => void) => {
    const fileContent = doc.file
    try {
      const url = URL.createObjectURL(fileContent)
      const link = document.createElement('a')
      link.href = url
      link.download = fileContent.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
    }
    onFinish()
  }

  const deleteDocument = async (document: DashboardDocument, onFinish: () => void) => {
    documents.value = documents.value.filter((doc) => doc.id !== document.id)
    selectedDocument.value = null
    onFinish()
  }

  return { documents, selectedDocument, getDocuments, deleteDocument, downloadDocument }
})
