<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Спільні моменти</h1>
          <button 
            @click="showCreateFolderModal = true"
            class="btn btn-primary flex items-center"
          >
            <i class="material-icons mr-2">create_new_folder</i>
            Створити папку
          </button>
        </div>
      </div>
    </div>

    <!-- Folders Grid -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="folder in folders"
            :key="folder.id"
            class="relative group cursor-pointer"
            @click="openFolder(folder)"
          >
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <!-- Показуємо останнє фото з папки як прев'ю -->
              <img
                v-if="folder.previewUrl"
                :src="folder.previewUrl"
                class="w-full h-full object-cover"
                alt=""
              >
              <div v-else class="w-full h-full flex items-center justify-center">
                <i class="material-icons text-4xl text-gray-400">folder</i>
              </div>
            </div>
            <div class="mt-2">
              <h3 class="text-sm font-medium text-gray-900">{{ folder.name }}</h3>
              <p class="text-xs text-gray-500">{{ folder.photosCount || 0 }} фото</p>
            </div>
            <!-- Кнопки управління папкою -->
            <div class="absolute top-2 right-2 hidden group-hover:flex space-x-2">
              <button
                @click.stop="editFolder(folder)"
                class="p-1 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <i class="material-icons text-gray-600 text-sm">edit</i>
              </button>
              <button
                @click.stop="deleteFolder(folder.id)"
                class="p-1 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <i class="material-icons text-red-600 text-sm">delete</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальне вікно для створення/редагування папки -->
    <div v-if="showCreateFolderModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingFolder ? 'Редагувати папку' : 'Створити нову папку' }}
        </h3>
        <form @submit.prevent="handleFolderSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Назва папки</label>
            <input
              v-model="folderForm.name"
              type="text"
              class="input mt-1"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Опис</label>
            <textarea
              v-model="folderForm.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeFolderModal"
              class="btn"
            >
              Скасувати
            </button>
            <button
              type="submit"
              class="btn btn-primary"
            >
              {{ editingFolder ? 'Зберегти' : 'Створити' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Модальне вікно для перегляду папки -->
    <div v-if="selectedFolder" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-medium text-gray-900">{{ selectedFolder.name }}</h3>
          <div class="flex space-x-4">
            <label class="btn btn-primary cursor-pointer">
              <i class="material-icons mr-2">add_photo_alternate</i>
              Додати фото
              <input
                type="file"
                accept="image/*"
                multiple
                class="hidden"
                @change="uploadPhotos"
              >
            </label>
            <button
              @click="selectedFolder = null"
              class="btn"
            >
              Закрити
            </button>
          </div>
        </div>

        <!-- Сітка фотографій -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="photo in selectedFolder.photos"
            :key="photo.id"
            class="relative group"
          >
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                :src="photo.url"
                class="w-full h-full object-cover"
                alt=""
                @click="openPhotoViewer(photo)"
              >
            </div>
            <button
              @click="deletePhoto(photo.id)"
              class="absolute top-2 right-2 hidden group-hover:block p-1 bg-white rounded-full shadow hover:bg-gray-100"
            >
              <i class="material-icons text-red-600 text-sm">delete</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { 
  listenToData, 
  pushData, 
  updateData, 
  removeData 
} from '../firebase/database-service'

const authStore = useAuthStore()
const folders = ref([])
const showCreateFolderModal = ref(false)
const editingFolder = ref(null)
const selectedFolder = ref(null)
const folderForm = ref({
  name: '',
  description: ''
})

// Завантаження папок при монтуванні компонента
onMounted(() => {
  listenToData('folders', (data) => {
    if (data) {
      folders.value = Object.entries(data).map(([id, folder]) => ({
        id,
        ...folder,
        photosCount: folder.photos ? Object.keys(folder.photos).length : 0
      }))
    }
  })
})

// Створення/редагування папки
const handleFolderSubmit = async () => {
  try {
    const folderData = {
      ...folderForm.value,
      userId: authStore.user.uid,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    if (editingFolder.value) {
      await updateData(`folders/${editingFolder.value.id}`, folderData)
    } else {
      await pushData('folders', folderData)
    }
    closeFolderModal()
  } catch (error) {
    console.error('Error saving folder:', error)
    alert('Помилка при збереженні папки: ' + error.message)
  }
}

// Відкриття папки для перегляду
const openFolder = (folder) => {
  selectedFolder.value = folder
}

// Редагування папки
const editFolder = (folder) => {
  editingFolder.value = folder
  folderForm.value = {
    name: folder.name,
    description: folder.description || ''
  }
  showCreateFolderModal.value = true
}

// Видалення папки
const deleteFolder = async (folderId) => {
  if (confirm('Ви впевнені, що хочете видалити цю папку?')) {
    try {
      await removeData(`folders/${folderId}`)
    } catch (error) {
      console.error('Error deleting folder:', error)
      alert('Помилка при видаленні папки: ' + error.message)
    }
  }
}

// Завантаження фотографій
const uploadPhotos = async (event) => {
  const files = event.target.files
  if (!files.length) return

  try {
    for (const file of files) {
      // TODO: Implement file upload to Firebase Storage
      // For now, we'll just create a record in the database
      await pushData(`folders/${selectedFolder.value.id}/photos`, {
        name: file.name,
        url: URL.createObjectURL(file), // This is temporary, should be replaced with actual upload URL
        uploadedBy: authStore.user.uid,
        uploadedAt: Date.now()
      })
    }
  } catch (error) {
    console.error('Error uploading photos:', error)
    alert('Помилка при завантаженні фотографій: ' + error.message)
  }
}

// Видалення фотографії
const deletePhoto = async (photoId) => {
  if (confirm('Ви впевнені, що хочете видалити це фото?')) {
    try {
      await removeData(`folders/${selectedFolder.value.id}/photos/${photoId}`)
    } catch (error) {
      console.error('Error deleting photo:', error)
      alert('Помилка при видаленні фото: ' + error.message)
    }
  }
}

// Закриття модального вікна створення/редагування папки
const closeFolderModal = () => {
  showCreateFolderModal.value = false
  editingFolder.value = null
  folderForm.value = {
    name: '',
    description: ''
  }
}
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style> 