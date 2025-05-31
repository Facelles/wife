<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Медіа бібліотека</h2>
        <p class="mt-2 text-sm text-gray-600">Ваші фото та відео</p>
      </div>

      <!-- Upload Button -->
      <div class="mb-6 flex justify-end">
        <button
          @click="showUploadModal = true"
          class="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span class="material-icons">upload</span>
          <span>Завантажити файл</span>
        </button>
      </div>

      <!-- Media Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="item in mediaItems"
          :key="item.id"
          class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Image Preview -->
          <div v-if="item.type.startsWith('image/')" class="relative aspect-square overflow-hidden">
            <img
              :src="item.url"
              :alt="item.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            >
          </div>
          
          <!-- Video Preview -->
          <div v-else-if="item.type.startsWith('video/')" class="relative aspect-video overflow-hidden">
            <video
              :src="item.url"
              class="w-full h-full object-cover"
              controls
            ></video>
          </div>

          <!-- Item Info -->
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-medium text-gray-900 truncate">{{ item.name }}</h3>
              <button 
                @click="confirmDelete(item)" 
                class="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <span class="material-icons">delete</span>
              </button>
            </div>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <div class="flex items-center space-x-2">
                <span class="material-icons text-base">schedule</span>
                <span>{{ formatDate(item.createdAt) }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="material-icons text-base">storage</span>
                <span>{{ formatFileSize(item.size) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upload Modal -->
      <div v-if="showUploadModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-medium text-gray-900">Завантажити файл</h3>
            <button @click="showUploadModal = false" class="text-gray-400 hover:text-gray-500">
              <span class="material-icons">close</span>
            </button>
          </div>
          
          <div class="space-y-6">
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-primary-500 transition-colors">
              <div class="space-y-1 text-center">
                <div class="flex text-sm text-gray-600">
                  <label class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                    <span>Завантажити файл</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      @change="handleFileSelect"
                      class="sr-only"
                    >
                  </label>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF, MP4 до 5GB</p>
              </div>
            </div>

            <div v-if="selectedFile" class="text-center">
              <p class="text-sm text-gray-600">{{ selectedFile.name }}</p>
              <p class="text-xs text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
            </div>

            <div class="flex justify-end space-x-4">
              <button
                @click="showUploadModal = false"
                class="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Скасувати
              </button>
              <button
                @click="handleUpload"
                :disabled="!selectedFile || isUploading"
                class="px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isUploading ? 'Завантаження...' : 'Завантажити' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-medium text-gray-900">Підтвердження видалення</h3>
            <button @click="showDeleteModal = false" class="text-gray-400 hover:text-gray-500">
              <span class="material-icons">close</span>
            </button>
          </div>
          <p class="text-gray-600 mb-6">Ви впевнені, що хочете видалити цей файл?</p>
          <div class="flex justify-end space-x-4">
            <button
              @click="showDeleteModal = false"
              class="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              @click="handleDelete"
              class="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              Видалити
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
import { listenToData, pushData, removeData } from '../firebase/database-service'
import { uploadFile, deleteFile, validateFile } from '../firebase/storage-service'

const authStore = useAuthStore()
const mediaItems = ref([])
const showUploadModal = ref(false)
const showDeleteModal = ref(false)
const selectedFile = ref(null)
const selectedItem = ref(null)
const isUploading = ref(false)

// Завантаження медіафайлів
onMounted(() => {
  if (authStore.user?.uid) {
    listenToData('media', (data) => {
      if (data) {
        mediaItems.value = Object.entries(data)
          .map(([id, item]) => ({
            id,
            ...item
          }))
          .sort((a, b) => b.createdAt - a.createdAt)
      }
    })
  }
})

// Обробка вибору файлу
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    validateFile(file)
    selectedFile.value = file
  } catch (error) {
    alert(error.message)
    event.target.value = null
  }
}

// Завантаження файлу
const handleUpload = async () => {
  if (!selectedFile.value) return

  try {
    isUploading.value = true
    
    // Завантажуємо файл
    const uploadResult = await uploadFile(selectedFile.value, `media/${authStore.user.uid}`)
    
    // Додаємо інформацію про файл до бази даних
    await pushData('media', {
      ...uploadResult,
      userId: authStore.user.uid,
      userEmail: authStore.user.email,
      createdAt: Date.now()
    })

    // Очищаємо форму
    selectedFile.value = null
    showUploadModal.value = false
  } catch (error) {
    console.error('Error uploading file:', error)
    alert('Помилка при завантаженні файлу')
  } finally {
    isUploading.value = false
  }
}

// Підтвердження видалення
const confirmDelete = (item) => {
  selectedItem.value = item
  showDeleteModal.value = true
}

// Видалення файлу
const handleDelete = async () => {
  if (!selectedItem.value) return

  try {
    // Видаляємо файл зі сховища
    await deleteFile(selectedItem.value.path)
    
    // Видаляємо інформацію з бази даних
    await removeData(`media/${selectedItem.value.id}`)
    
    showDeleteModal.value = false
    selectedItem.value = null
  } catch (error) {
    console.error('Error deleting file:', error)
    alert('Помилка при видаленні файлу')
  }
}

// Форматування дати
const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Форматування розміру файлу
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.animate-slide-down {
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 