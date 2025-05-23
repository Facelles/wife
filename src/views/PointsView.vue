<template>
  <div class="space-y-8 max-w-2xl mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold text-center mb-4">Бали</h2>
    <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
      <div class="flex flex-col items-center mb-4">
        <span class="text-gray-500">Партнер</span>
        <span class="text-4xl font-bold text-primary-600">{{ partnerPoints }}</span>
      </div>
      <button @click="showAddPointsModal = true" class="btn btn-primary w-full mb-2">Додати бали партнеру</button>
      <button @click="goToShop" class="btn btn-secondary w-full">Перейти в магазин</button>
    </div>

    <div class="bg-white rounded-xl shadow p-6">
      <h3 class="text-lg font-medium mb-4">Історія балів</h3>
      <div v-if="pointsHistory.length" class="space-y-4">
        <div v-for="entry in pointsHistory" :key="entry.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <div class="font-medium">{{ entry.description }}</div>
            <div class="text-xs text-gray-400">{{ formatDate(entry.createdAt) }}</div>
          </div>
          <span class="text-lg font-semibold text-primary-600">+{{ entry.amount }}</span>
        </div>
      </div>
      <div v-else class="text-center text-gray-400 py-8">Поки що немає історії балів</div>
    </div>

    <!-- Add Points Modal -->
    <div v-if="showAddPointsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md mx-auto transform transition-all">
        <h3 class="text-xl font-medium text-gray-900 mb-4 text-center">Додати бали партнеру</h3>
        <form @submit.prevent="handleAddPoints" class="space-y-4">
          <div>
            <label for="addPointsAmount" class="block text-sm font-medium text-gray-700">Кількість</label>
            <input 
              id="addPointsAmount"
              type="number" 
              v-model="addPointsAmount" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" 
              min="1" 
              required
            >
          </div>
          <div>
            <label for="addPointsDescription" class="block text-sm font-medium text-gray-700">Опис</label>
            <input 
              id="addPointsDescription"
              type="text" 
              v-model="addPointsDescription" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" 
              required
            >
          </div>
          <div class="flex justify-end space-x-3">
            <button type="button" @click="showAddPointsModal = false" class="btn btn-secondary">Скасувати</button>
            <button type="submit" class="btn btn-primary">Додати бали</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData } from '../firebase/database-service'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const showAddPointsModal = ref(false)
const addPointsAmount = ref(1)
const addPointsDescription = ref('')
const pointsHistory = ref([])
const partnerPoints = ref(0)

const myUid = computed(() => authStore.user?.uid)
const partnerUid = computed(() => {
  if (!authStore.user) return null
  return authStore.user.email === 'facellesit@gmail.com' ? 
    'martadaniluk4@gmail.com' : 
    'facellesit@gmail.com'
})

onMounted(() => {
  if (!authStore.user) return
  
  // Підписуємось на зміни в транзакціях балів
  listenToData('points_transactions', (data) => {
    if (!data) return
    
    // Фільтруємо транзакції для партнера
    const partnerTransactions = Object.entries(data)
      .filter(([_, transaction]) => transaction.userEmail === partnerUid.value)
      .map(([id, transaction]) => ({ id, ...transaction }))
      .sort((a, b) => b.timestamp - a.timestamp)
    
    // Рахуємо загальну кількість балів партнера
    partnerPoints.value = partnerTransactions.reduce((sum, t) => sum + t.amount, 0)
    pointsHistory.value = partnerTransactions
  })
})

const handleAddPoints = async () => {
  if (!addPointsAmount.value || addPointsAmount.value <= 0) {
    alert('Введіть коректну кількість балів')
    return
  }
  if (!addPointsDescription.value || addPointsDescription.value.trim() === '') {
    alert('Введіть опис')
    return
  }
  if (!partnerUid.value) {
    alert('Помилка: не знайдено партнера')
    return
  }

  try {
    // Додаємо транзакцію балів
    await pushData('points_transactions', {
      amount: Number(addPointsAmount.value),
      reason: addPointsDescription.value.trim(),
      timestamp: Date.now(),
      userId: partnerUid.value,
      userEmail: partnerUid.value,
      type: 'reward'
    })
    
    showAddPointsModal.value = false
    addPointsAmount.value = 1
    addPointsDescription.value = ''
  } catch (error) {
    console.error('Помилка при додаванні балів:', error)
    alert('Помилка при додаванні балів')
  }
}

const goToShop = () => {
  router.push('/shop')
}

const formatDate = (ts) => {
  if (!ts) return ''
  const d = new Date(ts)
  return d.toLocaleDateString()
}
</script>

<style scoped>
.btn {
  padding: 1rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
}
.btn:focus {
  outline: none;
  --tw-ring-offset-width: 2px;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.btn-primary {
  background-color: rgb(79 70 229);
  color: white;
}
.btn-primary:hover {
  background-color: rgb(67 56 202);
}
.btn-primary:focus {
  --tw-ring-color: rgb(99 102 241);
}
.btn-secondary {
  background-color: rgb(229 231 235);
  color: rgb(55 65 81);
}
.btn-secondary:hover {
  background-color: rgb(209 213 219);
}
.btn-secondary:focus {
  --tw-ring-color: rgb(107 114 128);
}
</style>