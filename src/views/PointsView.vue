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
            <label class="block text-sm font-medium text-gray-700">Кількість</label>
            <input type="number" v-model="addPointsAmount" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" min="1" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Опис</label>
            <input type="text" v-model="addPointsDescription" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" required>
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
const partnerUid = ref(null)

onMounted(() => {
  if (!authStore.user) return
  listenToData('points', (data) => {
    if (!data) return
    // Знаходимо partnerUid (перший uid, який не мій)
    partnerUid.value = Object.keys(data).find(uid => uid !== myUid.value)
    // Показуємо бали партнера
    if (partnerUid.value && data[partnerUid.value]) {
      const arr = Object.entries(data[partnerUid.value]).map(([id, entry]) => ({ id, ...entry }))
      partnerPoints.value = arr.reduce((sum, e) => sum + (e.amount || 0), 0)
      pointsHistory.value = arr.sort((a, b) => b.createdAt - a.createdAt)
    } else {
      partnerPoints.value = 0
      pointsHistory.value = []
    }
  })
})

const handleAddPoints = async () => {
  if (!addPointsAmount.value || !addPointsDescription.value.trim() || !partnerUid.value) {
    alert('Введіть кількість балів і опис')
    return
  }
  try {
    await pushData(`points/${partnerUid.value}`, {
      amount: addPointsAmount.value,
      description: addPointsDescription.value,
      from: myUid.value,
      createdAt: Date.now()
    })
    showAddPointsModal.value = false
    addPointsAmount.value = 1
    addPointsDescription.value = ''
  } catch (e) {
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
  @apply px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2;
}
.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
}
.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500;
}
</style> 