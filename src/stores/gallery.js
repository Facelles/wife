import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGalleryStore = defineStore('gallery', () => {
  const folders = ref([])
  const currentFolder = ref(null)

  const setFolders = (newFolders) => {
    folders.value = newFolders
  }

  const setCurrentFolder = (folder) => {
    currentFolder.value = folder
  }

  return {
    folders,
    currentFolder,
    setFolders,
    setCurrentFolder
  }
}) 