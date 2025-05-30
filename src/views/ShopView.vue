<template>
  <div class="space-y-8 max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center animate-slide-down">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4">
        Магазин
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl text-gray-500">
        Обміняй бали на подарунки 💝
      </p>
      <div class="mt-4 flex items-center justify-center space-x-4">
        <div class="flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full">
          <span class="material-icons text-primary-500">stars</span>
          <span class="text-primary-600 font-semibold">{{ currentUserPoints }} балів</span>
        </div>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <div class="relative w-full sm:w-96">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Пошук товарів..."
          class="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
        >
        <span class="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
      </div>
      <div class="flex space-x-2">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-xl transition-colors',
            selectedCategory === category
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Add Item Button -->
    <div class="flex justify-end">
      <button
        @click="showAddItemModal = true"
        class="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <span class="material-icons">add</span>
        <span>Додати товар</span>
      </button>
    </div>

    <!-- Items Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div class="relative aspect-square overflow-hidden">
          <img
            :src="item.imageUrl"
            :alt="item.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p class="text-sm line-clamp-2">{{ item.description }}</p>
          </div>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <h3 class="text-xl font-medium text-gray-900 mb-2 line-clamp-2">{{ item.name }}</h3>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <div class="flex items-center space-x-2">
                <span class="material-icons text-base">person</span>
                <span class="truncate">{{ item.userEmail }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="material-icons text-base">schedule</span>
                <span>{{ formatDate(item.createdAt) }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center space-x-2">
              <span class="material-icons text-primary-500">stars</span>
              <span class="text-primary-600 font-semibold">{{ item.price }} балів</span>
            </div>
            <div class="text-sm text-gray-500">
              Залишок: {{ item.quantity }}
            </div>
          </div>

          <button
            @click="confirmPurchase(item)"
            :disabled="item.quantity <= 0 || currentUserPoints < item.price"
            class="w-full px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {{ item.quantity <= 0 ? 'Закінчився' : 'Купити' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add Item Modal -->
    <div v-if="showAddItemModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl transform transition-all duration-300 scale-100">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-medium text-gray-900">Додати товар</h3>
          <button @click="showAddItemModal = false" class="text-gray-400 hover:text-gray-500">
            <span class="material-icons">close</span>
          </button>
        </div>
        <form @submit.prevent="handleAddItem" class="space-y-6">
          <div>
            <label for="itemName" class="block text-sm font-medium text-gray-700 mb-2">Назва</label>
            <input
              id="itemName"
              v-model="newItem.name"
              type="text"
              class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
              required
            >
          </div>
          <div>
            <label for="itemDescription" class="block text-sm font-medium text-gray-700 mb-2">Опис</label>
            <textarea
              id="itemDescription"
              v-model="newItem.description"
              rows="3"
              class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
              required
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="itemPrice" class="block text-sm font-medium text-gray-700 mb-2">Ціна (балів)</label>
              <input
                id="itemPrice"
                v-model.number="newItem.price"
                type="number"
                min="1"
                class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                required
              >
            </div>
            <div>
              <label for="itemQuantity" class="block text-sm font-medium text-gray-700 mb-2">Кількість</label>
              <input
                id="itemQuantity"
                v-model.number="newItem.quantity"
                type="number"
                min="1"
                class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                required
              >
            </div>
          </div>
          <div>
            <label for="itemCategory" class="block text-sm font-medium text-gray-700 mb-2">Категорія</label>
            <select
              id="itemCategory"
              v-model="newItem.category"
              class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
              required
            >
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <div>
            <label for="itemImage" class="block text-sm font-medium text-gray-700 mb-2">Зображення</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-primary-500 transition-colors">
              <div class="space-y-1 text-center">
                <div class="flex text-sm text-gray-600">
                  <label class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                    <span>Завантажити файл</span>
                    <input
                      id="itemImage"
                      type="file"
                      accept="image/*"
                      @change="handleImageUpload"
                      class="sr-only"
                      required
                    >
                  </label>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF до 10MB</p>
              </div>
            </div>
          </div>
          <div class="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              @click="showAddItemModal = false"
              class="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              Додати
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Purchase Confirmation Modal -->
    <div v-if="showPurchaseModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
        <h3 class="text-2xl font-medium text-gray-900 mb-4 text-center">Підтвердження покупки</h3>
        <div class="text-center space-y-4">
          <p class="text-gray-600">Ви дійсно хочете купити "{{ selectedItem?.name }}" за {{ selectedItem?.price }} балів?</p>
          <div class="flex justify-center space-x-4">
            <button
              @click="showPurchaseModal = false"
              class="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              @click="buyItem(selectedItem)"
              class="px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              Підтвердити
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData, updateData } from '../firebase/database-service'

const authStore = useAuthStore()
const shopItems = ref([])
const showAddItemModal = ref(false)
const showPurchaseModal = ref(false)
const currentUserPoints = ref(0)
const searchQuery = ref('')
const selectedCategory = ref('Всі')
const selectedItem = ref(null)

const categories = ['Всі', 'Подарунки', 'Розваги', 'Спорт', 'Інше']

const newItem = ref({
  name: '',
  description: '',
  price: 1,
  quantity: 1,
  imageUrl: '',
  category: 'Подарунки'
})

// Фільтрація товарів
const filteredItems = computed(() => {
  let items = shopItems.value

  // Фільтрація за категорією
  if (selectedCategory.value !== 'Всі') {
    items = items.filter(item => item.category === selectedCategory.value)
  }

  // Фільтрація за пошуковим запитом
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  }

  return items
})

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

onMounted(() => {
  // Завантаження товарів магазину
  listenToData('shop', (data) => {
    if (data) {
      shopItems.value = Object.entries(data)
        .map(([id, item]) => ({
          id,
          ...item
        }))
        .sort((a, b) => b.createdAt - a.createdAt)
    }
  })

  // Завантаження балів користувача
  if (authStore.user?.uid) {
    listenToData(`points/${authStore.user.uid}`, (data) => {
      if (data) {
        currentUserPoints.value = data.current || 0
      }
    })
  }
})

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    // TODO: Implement image upload to Firebase Storage
    // For now, we'll use a placeholder URL
    newItem.value.imageUrl = 'https://via.placeholder.com/400'
  } catch (error) {
    console.error('Error uploading image:', error)
    alert('Помилка при завантаженні зображення')
  }
}

const handleAddItem = async () => {
  try {
    await pushData('shop', {
      ...newItem.value,
      userId: authStore.user.uid,
      userEmail: authStore.user.email,
      createdAt: Date.now()
    })
    showAddItemModal.value = false
    newItem.value = {
      name: '',
      description: '',
      price: 1,
      quantity: 1,
      imageUrl: '',
      category: 'Подарунки'
    }
  } catch (error) {
    console.error('Error adding item:', error)
    alert('Помилка при додаванні товару')
  }
}

const confirmPurchase = (item) => {
  selectedItem.value = item
  showPurchaseModal.value = true
}

const buyItem = async (item) => {
  if (!item || item.quantity <= 0 || currentUserPoints.value < item.price) return

  try {
    // Оновлення кількості товару
    await updateData(`shop/${item.id}`, {
      quantity: item.quantity - 1
    })

    // Оновлення балів користувача
    await updateData(`points/${authStore.user.uid}`, {
      current: currentUserPoints.value - item.price
    })

    showPurchaseModal.value = false
    selectedItem.value = null
  } catch (error) {
    console.error('Error buying item:', error)
    alert('Помилка при покупці товару')
  }
}
</script>

<style scoped>
.animate-slide-down {
  animation: slideDown 0.5s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
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

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 