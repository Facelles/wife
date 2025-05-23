<template>
  <div class="space-y-8 max-w-6xl mx-auto px-4">
    <!-- Header -->
    <div class="text-center animate-slide-down">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4">
        Магазин
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl text-gray-500">
        Обміняй бали на подарунки 💝
      </p>
    </div>

    <!-- Add Item Button -->
    <div class="flex justify-end">
      <button
        @click="showAddItemModal = true"
        class="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
      >
        <span class="material-icons">add</span>
        <span>Додати товар</span>
      </button>
    </div>

    <!-- Items Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="item in shopItems"
        :key="item.id"
        class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 animate-slide-up shadow-lg hover:shadow-xl transition-shadow"
      >
        <div class="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 shadow-inner">
          <img
            :src="item.imageUrl"
            width="200"
            height="200"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            alt=""
          >
        </div>
        <div class="space-y-4">
          <div>
            <h3 class="text-xl font-medium text-gray-900 mb-2 line-clamp-2">{{ item.name }}</h3>
            <p class="text-gray-500 line-clamp-3">{{ item.description }}</p>
          </div>
          
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

          <div class="flex items-center justify-between pt-2 border-t border-gray-200">
            <div class="flex items-center space-x-2">
              <span class="material-icons text-primary-500">stars</span>
              <span class="text-primary-600 font-semibold">{{ item.price }} балів</span>
            </div>
            <div class="text-sm text-gray-500">
              Залишок: {{ item.quantity }}
            </div>
          </div>

          <button
            @click="buyItem(item)"
            :disabled="item.quantity <= 0 || points < item.price"
            class="w-full px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {{ item.quantity <= 0 ? 'Закінчився' : 'Купити' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add Item Modal -->
    <div v-if="showAddItemModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
        <h3 class="text-2xl font-medium text-gray-900 mb-6 text-center">Додати товар</h3>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData, updateData } from '../firebase/database-service'

const authStore = useAuthStore()
const shopItems = ref([])
const showAddItemModal = ref(false)
const points = ref(0)

const newItem = ref({
  name: '',
  description: '',
  price: 1,
  quantity: 1,
  imageUrl: ''
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
  listenToData(`points/${authStore.user.uid}`, (data) => {
    if (data) {
      points.value = data.current || 0
    }
  })
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
      imageUrl: ''
    }
  } catch (error) {
    console.error('Error adding item:', error)
    alert('Помилка при додаванні товару')
  }
}

const buyItem = async (item) => {
  if (points.value < item.price || item.quantity <= 0) return

  try {
    // Оновлюємо кількість товару
    await updateData(`shop/${item.id}`, {
      quantity: item.quantity - 1
    })

    // Віднімаємо бали
    await updateData(`points/${authStore.user.uid}`, {
      current: points.value - item.price,
      updatedAt: Date.now()
    })

    // Додаємо транзакцію
    await pushData('points_transactions', {
      amount: -item.price,
      reason: `Купівля: ${item.name}`,
      timestamp: Date.now(),
      userId: authStore.user.uid,
      userEmail: authStore.user.email,
      type: 'purchase'
    })

    points.value -= item.price
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
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
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

/* Додаємо стилі для обмеження тексту */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style> 