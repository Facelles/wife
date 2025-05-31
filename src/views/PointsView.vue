<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Бали</h2>
        <p class="mt-2 text-sm text-gray-600">Керуйте балами вашого партнера</p>
      </div>

      <!-- Points Card -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        <div class="p-6 sm:p-8">
          <div class="flex flex-col items-center space-y-4">
            <div class="text-center">
              <span class="text-sm font-medium text-gray-500">Партнер</span>
              <div class="mt-2">
                <span class="text-5xl font-bold text-primary-600 tracking-tight">{{ partnerPoints }}</span>
                <span class="ml-2 text-lg text-gray-500">балів</span>
              </div>
            </div>
            <div class="w-full space-y-3 sm:flex sm:space-y-0 sm:space-x-3">
              <button 
                @click="showAddPointsModal = true" 
                class="w-full sm:w-auto btn btn-primary flex items-center justify-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                <span>Додати бали</span>
              </button>
              <button 
                @click="goToShop" 
                class="w-full sm:w-auto btn btn-secondary flex items-center justify-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span>Магазин</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- History Card -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="p-6 sm:p-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-6">Історія балів</h3>
          <div v-if="pointsHistory.length" class="space-y-4">
            <div 
              v-for="entry in pointsHistory" 
              :key="entry.id" 
              class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              <div class="flex-1 min-w-0">
                <div class="font-medium text-gray-900 truncate">{{ entry.description }}</div>
                <div class="text-sm text-gray-500">{{ formatDate(entry.createdAt) }}</div>
              </div>
              <div class="ml-4 flex-shrink-0">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  +{{ entry.amount }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Немає історії</h3>
            <p class="mt-1 text-sm text-gray-500">Поки що немає транзакцій балів</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Points Modal -->
    <div v-if="showAddPointsModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-auto transform transition-all">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Додати бали партнеру</h3>
          <button @click="showAddPointsModal = false" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="handleAddPoints" class="space-y-6">
          <div>
            <label for="addPointsAmount" class="block text-sm font-medium text-gray-700">Кількість балів</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input 
                id="addPointsAmount"
                type="number" 
                v-model="addPointsAmount" 
                class="block w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                min="1" 
                required
              >
            </div>
          </div>
          <div>
            <label for="addPointsDescription" class="block text-sm font-medium text-gray-700">Опис</label>
            <div class="mt-1">
              <input 
                id="addPointsDescription"
                type="text" 
                v-model="addPointsDescription" 
                class="block w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                required
              >
            </div>
          </div>
          <div class="flex justify-end space-x-3">
            <button 
              type="button" 
              @click="showAddPointsModal = false" 
              class="btn btn-secondary"
            >
              Скасувати
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
            >
              Додати бали
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData, addPointsTransaction, updateUserPoints } from '../firebase/database-service'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const showAddPointsModal = ref(false)
const addPointsAmount = ref(1)
const addPointsDescription = ref('')
const pointsHistory = ref([])
const partnerPoints = ref(0)
const currentUserPoints = ref(0)
const partnerCurrentPoints = ref(0)
const partnerUid = ref(null)

const myUid = computed(() => authStore.user?.uid)
const partnerEmail = computed(() =>
  authStore.user?.email === 'facellesit@gmail.com'
    ? 'martadaniluk4@gmail.com'
    : 'facellesit@gmail.com'
)

const determinePartnerUid = async () => {
  try {
    if (!authStore.user) {
      console.warn('authStore.user not available yet in PointsView.')
      return
    }

    listenToData('users', (data) => {
      if (data) {
        const uids = Object.keys(data)
        const foundPartnerUid = uids.find(uid => data[uid].email === partnerEmail.value)
        if (foundPartnerUid) {
          partnerUid.value = foundPartnerUid
          console.log('PointsView: Partner UID determined:', partnerUid.value)
          
          listenToData(`points/${partnerUid.value}`, (data) => {
            if (data) {
              partnerCurrentPoints.value = data.current || 0
              partnerPoints.value = data.current || 0
            }
          })
        }
      } else {
        console.warn('PointsView: No user data received from Firebase.')
      }
    })
  } catch (error) {
    console.error('Error determining partner UID in PointsView:', error)
  }
}

onMounted(async () => {
  if (!authStore.user) return
  
  await determinePartnerUid()

  if (authStore.user.uid) {
    listenToData(`points/${authStore.user.uid}`, (data) => {
      if (data) {
        currentUserPoints.value = data.current || 0
      }
    })
  }

  listenToData('points_transactions', (data) => {
    if (!data) return
    
    const partnerTransactions = Object.entries(data)
      .filter(([_, transaction]) => transaction.userId === partnerUid.value)
      .map(([id, transaction]) => ({
        id,
        ...transaction,
        description: transaction.reason || 
                     (transaction.type === 'reward' ? `Отримано ${transaction.amount} балів` : 
                      transaction.type === 'transfer' ? `Передача ${transaction.amount} балів` : 
                      transaction.type === 'purchase' ? `Купівля на ${Math.abs(transaction.amount)} балів` : 
                      'Транзакція')
      }))
      .sort((a, b) => b.timestamp - a.timestamp)
    
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
    const transaction = {
      amount: Number(addPointsAmount.value),
      reason: addPointsDescription.value.trim(),
      type: 'reward',
      userId: partnerUid.value,
      userEmail: partnerEmail.value,
      timestamp: Date.now()
    }

    await pushData('points_transactions', transaction)

    await updateUserPoints(partnerUid.value, Number(addPointsAmount.value))
    
    addPointsAmount.value = 1
    addPointsDescription.value = ''
    
    showAddPointsModal.value = false

  } catch (error) {
    console.error('Помилка при додаванні балів:', error)
    alert('Помилка при додаванні балів')
    showAddPointsModal.value = false
  }
}

const goToShop = () => {
  router.push('/shop')
}

const formatDate = (ts) => {
  if (!ts) return ''
  const d = new Date(ts)
  const date = typeof ts === 'number' ? new Date(ts) : ts
  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.btn {
  @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500;
}

/* Improve input focus states */
input:focus {
  @apply ring-2 ring-primary-500 border-primary-500;
}

/* Add hover effects to cards */
.hover\:shadow-md:hover {
  @apply shadow-md;
}

/* Improve modal animation */
.modal-enter-active,
.modal-leave-active {
  @apply transition-opacity duration-300;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}
</style>