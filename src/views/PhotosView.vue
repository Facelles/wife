<template>
  <div class="space-y-8 max-w-6xl mx-auto px-4 py-8">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Фотографії</h2>
      <button @click="showUploadModal = true" class="btn btn-primary">
        Завантажити фото
      </button>
    </div>

    <!-- Фільтри -->
    <div class="bg-white rounded-xl shadow p-4">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Період</label>
          <select v-model="selectedPeriod" class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            <option value="all">Всі</option>
            <option value="week">Тиждень</option>
            <option value="month">Місяць</option>
            <option value="year">Рік</option>
          </select>
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Автор</label>
          <select v-model="selectedAuthor" class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            <option value="all">Всі</option>
            <option value="me">Мої</option>
            <option value="partner">Партнера</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Сітка фотографій -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="photo in filteredPhotos" :key="photo.id" 
           class="relative group bg-white rounded-xl shadow overflow-hidden">
        <img :src="photo.url" 
             :alt="photo.description || 'Фото'" 
             class="w-full h-48 object-cover cursor-pointer"
             @click="openPhotoViewer(photo)">
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200">
          <div class="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <p class="text-sm truncate">{{ photo.description || 'Без опису' }}</p>
            <p class="text-xs mt-1">{{ formatDate(photo.createdAt) }}</p>
          </div>
          <button v-if="canDeletePhoto(photo)" 
                  @click.stop="confirmDeletePhoto(photo)"
                  class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Модальне вікно завантаження -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 class="text-xl font-medium text-gray-900 mb-4">Завантажити фото</h3>
        <form @submit.prevent="handleUpload" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Фото</label>
            <input type="file" 
                   @change="handleFileSelect" 
                   accept="image/*"
                   class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Опис</label>
            <input type="text" 
                   v-model="uploadDescription" 
                   class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                   placeholder="Опишіть фото...">
          </div>
          <div class="flex justify-end space-x-3">
            <button type="button" 
                    @click="showUploadModal = false" 
                    class="btn btn-secondary">
              Скасувати
            </button>
            <button type="submit" 
                    class="btn btn-primary"
                    :disabled="!selectedFile">
              Завантажити
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Модальне вікно перегляду фото -->
    <div v-if="selectedPhoto" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div class="relative max-w-4xl w-full">
        <button @click="selectedPhoto = null" 
                class="absolute top-4 right-4 text-white hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img :src="selectedPhoto.url" 
             :alt="selectedPhoto.description || 'Фото'" 
             class="max-h-[80vh] w-full object-contain">
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <p class="text-white text-lg">{{ selectedPhoto.description || 'Без опису' }}</p>
          <p class="text-gray-300 text-sm mt-1">{{ formatDate(selectedPhoto.createdAt) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData, deleteData, uploadFile } from '../firebase/database-service'

const authStore = useAuthStore()
const photos = ref([])
const showUploadModal = ref(false)
const selectedFile = ref(null)
const uploadDescription = ref('')
const selectedPhoto = ref(null)
const selectedPeriod = ref('all')
const selectedAuthor = ref('all')

// Завантаження фотографій
onMounted(() => {
  listenToData('photos', (data) => {
    if (data) {
      photos.value = Object.entries(data).map(([id, photo]) => ({
        id,
        ...photo
      })).sort((a, b) => b.createdAt - a.createdAt)
    }
  })
})

// Фільтрація фотографій
const filteredPhotos = computed(() => {
  let filtered = [...photos.value]
  
  // Фільтр за періодом
  if (selectedPeriod.value !== 'all') {
    const now = Date.now()
    const periodMs = {
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      year: 365 * 24 * 60 * 60 * 1000
    }[selectedPeriod.value]
    
    filtered = filtered.filter(photo => 
      photo.createdAt && (now - photo.createdAt) <= periodMs
    )
  }
  
  // Фільтр за автором
  if (selectedAuthor.value !== 'all') {
    filtered = filtered.filter(photo => {
      if (selectedAuthor.value === 'me') {
        return photo.userId === authStore.user.uid
      } else {
        return photo.userId !== authStore.user.uid
      }
    })
  }
  
  return filtered
})

// Обробка вибору файлу
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
  } else {
    alert('Будь ласка, виберіть зображення')
    event.target.value = null
  }
}

// Завантаження фото
const handleUpload = async () => {
  if (!selectedFile.value) {
    alert('Виберіть фото для завантаження')
    return
  }

  try {
    const timestamp = Date.now()
    const filePath = `photos/${authStore.user.uid}/${timestamp}_${selectedFile.value.name}`
    const url = await uploadFile(selectedFile.value, filePath)
    await pushData('photos', {
      url,
      description: uploadDescription.value.trim(),
      userId: authStore.user.uid,
      userEmail: authStore.user.email,
      createdAt: timestamp
    })
    
    showUploadModal.value = false
    selectedFile.value = null
    uploadDescription.value = ''
  } catch (error) {
    console.error('Error uploading photo:', error)
    alert('Помилка при завантаженні фото')
  }
}

// Відкриття перегляду фото
const openPhotoViewer = (photo) => {
  selectedPhoto.value = photo
}

// Перевірка можливості видалення фото
const canDeletePhoto = (photo) => {
  return photo.userId === authStore.user.uid
}

// Підтвердження видалення фото
const confirmDeletePhoto = async (photo) => {
  if (confirm('Ви впевнені, що хочете видалити це фото?')) {
    try {
      await deleteData(`photos/${photo.id}`)
    } catch (error) {
      console.error('Помилка при видаленні фото:', error)
      alert('Помилка при видаленні фото')
    }
  }
}

// Форматування дати
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-colors duration-200;
}
.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}
.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
}
</style> 