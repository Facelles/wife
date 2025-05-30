<template>
  <div class="space-y-6">
    <!-- Sleep overview -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Огляд Сну</h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <dl>
              <dt class="text-sm font-medium text-gray-500">Середня кількість годин сну</dt>
              <dd class="mt-1 text-3xl font-semibold text-primary-600">{{ sleep.averageSleepHours }} год</dd>
            </dl>
          </div>
          <div>
            <dl>
              <dt class="text-sm font-medium text-gray-500">Середня якість сну</dt>
              <dd class="mt-1 text-3xl font-semibold text-primary-600">{{ sleep.averageSleepQuality }} / 10</dd>
            </dl>
          </div>
          <div>
            <dl>
              <dt class="text-sm font-medium text-gray-500">Сьогоднішній сон</dt>
              <dd class="mt-1 text-3xl font-semibold text-primary-600">
                {{ sleep.todaySleepRecord?.hours || '0' }} год
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Add sleep record -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Записати сьогоднішній сон</h3>
        <form @submit.prevent="handleAddSleep" class="space-y-4">
          <div>
            <label for="sleepHours" class="block text-sm font-medium text-gray-700">Години сну</label>
            <input
              id="sleepHours"
              type="number"
              v-model.number="newSleep.hours"
              step="0.5"
              min="0"
              max="24"
              class="input mt-1"
              required
            >
          </div>
          <div>
            <label for="sleepQuality" class="block text-sm font-medium text-gray-700">Якість сну (1-10)</label>
            <input
              id="sleepQuality"
              type="number"
              v-model.number="newSleep.quality"
              min="1"
              max="10"
              class="input mt-1"
              required
            >
          </div>
          <div>
            <label for="sleepNotes" class="block text-sm font-medium text-gray-700">Нотатки</label>
            <textarea
              id="sleepNotes"
              v-model="newSleep.notes"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Як ви спали?"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            Зберегти запис сну
          </button>
        </form>
      </div>
    </div>

    <!-- Sleep history -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Історія сну</h3>
          <button @click="showPartnerHistory = !showPartnerHistory" class="btn btn-secondary btn-sm">
            {{ showPartnerHistory ? 'Моя історія' : 'Історія партнера' }}
          </button>
        </div>
        <div v-if="showPartnerHistory">
           <div v-if="sleep.partnerSleepRecords.length" class="space-y-4">
              <div
                 v-for="record in sleep.partnerSleepRecords"
                 :key="record.id"
                 class="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
              >
                 <div>
                    <div class="flex items-center space-x-2">
                       <span class="font-medium">{{ record.hours }} год</span>
                       <span class="text-sm text-gray-500">сну</span>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">
                       {{ formatDate(record.date) }}
                    </p>
                    <p v-if="record.notes" class="mt-2 text-sm text-gray-600 line-clamp-2">
                       {{ record.notes }}
                    </p>
                 </div>
                 <div class="text-right">
                    <div class="text-sm font-medium text-gray-900">
                       Якість: {{ record.quality }}/10
                    </div>
                    <div
                       :class="[
                          'text-sm mt-1',
                          record.hours >= sleep.sleepGoals?.minHours && record.hours <= sleep.sleepGoals?.maxHours
                             ? 'text-green-600'
                             : 'text-red-600'
                       ]"
                    >
                       {{ record.hours >= sleep.sleepGoals?.minHours && record.hours <= sleep.sleepGoals?.maxHours
                          ? 'Хороший сон'
                          : 'Поза цільовим діапазоном' }}
                    </div>
                 </div>
              </div>
           </div>
           <div v-else class="text-center text-gray-400 py-8">Поки що немає записів сну партнера</div>
        </div>
        <div v-else>
           <div v-if="sleep.sleepRecords.length" class="space-y-4">
              <div
                 v-for="record in sleep.sleepRecords"
                 :key="record.id"
                 class="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
              >
                 <div>
                    <div class="flex items-center space-x-2">
                       <span class="font-medium">{{ record.hours }} год</span>
                       <span class="text-sm text-gray-500">сну</span>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">
                       {{ formatDate(record.date) }}
                    </p>
                    <p v-if="record.notes" class="mt-2 text-sm text-gray-600 line-clamp-2">
                       {{ record.notes }}
                    </p>
                 </div>
                 <div class="text-right">
                    <div class="text-sm font-medium text-gray-900">
                       Якість: {{ record.quality }}/10
                    </div>
                    <div
                       :class="[
                          'text-sm mt-1',
                          record.hours >= sleep.sleepGoals?.minHours && record.hours <= sleep.sleepGoals?.maxHours
                             ? 'text-green-600'
                             : 'text-red-600'
                       ]"
                    >
                       {{ record.hours >= sleep.sleepGoals?.minHours && record.hours <= sleep.sleepGoals?.maxHours
                          ? 'Хороший сон'
                          : 'Поза цільовим діапазоном' }}
                    </div>
                    <button @click="sleep.deleteSleepRecord(record.id)" class="text-red-600 text-xs mt-2">Видалити</button>
                 </div>
              </div>
           </div>
           <div v-else class="text-center text-gray-400 py-8">Поки що немає ваших записів сну</div>
        </div>
      </div>
    </div>

    <!-- Sleep goals -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Цілі сну</h3>
        <div v-if="sleep.sleepGoals">
          <form @submit.prevent="updateGoals" class="space-y-4">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="minHours" class="block text-sm font-medium text-gray-700">Мінімум годин</label>
                <input
                  id="minHours"
                  type="number"
                  v-model.number="goals.minHours"
                  min="0"
                  max="24"
                  class="input mt-1"
                  required
                >
              </div>
              <div>
                <label for="maxHours" class="block text-sm font-medium text-gray-700">Максимум годин</label>
                <input
                  id="maxHours"
                  type="number"
                  v-model.number="goals.maxHours"
                  min="0"
                  max="24"
                  class="input mt-1"
                  required
                >
              </div>
              <div>
                <label for="targetBedtime" class="block text-sm font-medium text-gray-700">Цільовий час засинання</label>
                <input
                  id="targetBedtime"
                  type="time"
                  v-model="goals.targetBedtime"
                  class="input mt-1"
                  required
                >
              </div>
              <div>
                <label for="targetWakeup" class="block text-sm font-medium text-gray-700">Цільовий час пробудження</label>
                <input
                  id="targetWakeup"
                  type="time"
                  v-model="goals.targetWakeup"
                  class="input mt-1"
                  required
                >
              </div>
            </div>
            <button type="submit" class="btn btn-primary">
              Оновити цілі
            </button>
          </form>
        </div>
        <div v-else class="text-center text-gray-400 py-8">Завантаження цілей...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSleepStore } from '../stores/sleep'
import { useAuthStore } from '../stores/auth'
import { listenToData } from '../firebase/database-service'

const sleep = useSleepStore()
const authStore = useAuthStore()

const newSleep = ref({
  date: new Date().toISOString().split('T')[0],
  hours: 0,
  quality: 5,
  notes: ''
})

const goals = ref({
  minHours: 7,
  maxHours: 9,
  targetBedtime: '23:00',
  targetWakeup: '07:00'
})

const showPartnerHistory = ref(false)
const partnerUid = ref(null)

const determinePartnerUid = async () => {
  try {
    if (!authStore.user) {
      console.warn('SleepView: authStore.user not available yet.')
      return
    }
    listenToData('users', (data) => {
      if (data) {
        const uids = Object.keys(data)
        partnerUid.value = uids.find(uid => uid !== authStore.user.uid)
        console.log('SleepView: Partner UID determined:', partnerUid.value)
        sleep.fetchSleepData(partnerUid.value)
      } else {
        console.warn('SleepView: No user data received from Firebase.')
      }
    })
  } catch (error) {
    console.error('Error determining partner UID in SleepView:', error)
  }
}

onMounted(async () => {
    await determinePartnerUid()
})

onUnmounted(() => {
    sleep.unsubscribeFromSleepData()
})

const handleAddSleep = () => {
  sleep.addSleepRecord(newSleep.value)
  newSleep.value = {
    date: new Date().toISOString().split('T')[0],
    hours: 0,
    quality: 5,
    notes: ''
  }
}

const updateGoals = () => {
  sleep.updateSleepGoals(goals.value)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
   return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm;
}
.btn-primary {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500;
}
.btn-secondary {
  @apply inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 