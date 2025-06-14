<template>
  <div class="space-y-6">
    <!-- Stats header -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900">Детальна аналітика</h2>
        
        <!-- Date range selector -->
        <div class="mt-4 flex items-center space-x-4">
          <div>
            <label for="periodSelect" class="block text-sm font-medium text-gray-700">Період</label>
            <select
              id="periodSelect"
              v-model="selectedPeriod"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="week">Тиждень</option>
              <option value="month">Місяць</option>
              <option value="year">Рік</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Mood stats -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Настрій</h3>
          <div class="space-y-4">
            <!-- Зайчик -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Зайчик</h4>
              <div v-if="moodStats.user.length" class="space-y-2">
                <div v-for="stat in moodStats.user" :key="stat.mood" class="flex items-center justify-between">
                  <span class="text-gray-600">{{ stat.mood }}</span>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500">{{ stat.count }} разів</span>
                    <span class="text-sm font-medium text-primary-600">{{ stat.percentage }}%</span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center text-gray-400 py-2">Немає даних</div>
            </div>

            <!-- Кицюня -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-2">Кицюня</h4>
              <div v-if="moodStats.partner.length" class="space-y-2">
                <div v-for="stat in moodStats.partner" :key="stat.mood" class="flex items-center justify-between">
                  <span class="text-gray-600">{{ stat.mood }}</span>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500">{{ stat.count }} разів</span>
                    <span class="text-sm font-medium text-primary-600">{{ stat.percentage }}%</span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center text-gray-400 py-2">Немає даних</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Task completion stats -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Завдання</h3>
          <div class="relative pt-1">
            <div class="flex mb-2 items-center justify-between">
              <div>
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                  Прогрес
                </span>
              </div>
              <div class="text-right">
                <span class="text-xs font-semibold inline-block text-primary-600">
                  {{ taskCompletionRate }}%
                </span>
              </div>
            </div>
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
              <div
                :style="{ width: `${taskCompletionRate}%` }"
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
              ></div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-center">
              <div class="bg-green-100 p-3 rounded-lg">
                <div class="text-xl font-bold text-green-800">{{ completedTasks }}</div>
                <div class="text-sm text-green-600">Завершено</div>
              </div>
              <div class="bg-yellow-100 p-3 rounded-lg">
                <div class="text-xl font-bold text-yellow-800">{{ pendingTasks }}</div>
                <div class="text-sm text-yellow-600">В процесі</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Points stats -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Бали</h3>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ totalPoints }}</div>
            <div class="text-sm text-gray-500">Загальна кількість балів</div>
          </div>
          <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Останні нарахування</h4>
            <div class="space-y-2">
              <div v-for="point in recentPoints" :key="point.id" class="flex justify-between items-center text-sm">
                <span class="text-gray-500">{{ point.description }}</span>
                <span :class="point.value > 0 ? 'text-green-600' : 'text-red-600'">
                  {{ point.value > 0 ? '+' : '' }}{{ point.value }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity timeline -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Активність</h3>
        <div class="flow-root">
          <ul class="-mb-8">
            <li v-for="activity in activityTimeline" :key="activity.id">
              <div class="relative pb-8">
                <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                <div class="relative flex space-x-3">
                  <div>
                    <span :class="[
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                      getActivityTypeClass(activity.type)
                    ]">
                      {{ activity.icon }}
                    </span>
                  </div>
                  <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p class="text-sm text-gray-500">
                        {{ activity.description }}
                      </p>
                      <p class="text-xs text-gray-400 mt-1">
                        Автор: {{ activity.author }}
                      </p>
                    </div>
                    <div class="whitespace-nowrap text-right text-sm text-gray-500">
                      {{ formatDate(activity.date) }}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Mood comparison -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- mood поточного користувача -->
      <div
        class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up cursor-pointer"
        @click="showMoodSelector = true"
      >
        <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">
          {{ currentUserLabel }}
        </h3>
        <p class="text-4xl md:text-6xl">{{ currentMood || '😊' }}</p>
      </div>
      <!-- mood партнера -->
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up">
        <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">
          {{ partnerLabel }}
        </h3>
        <p class="text-4xl md:text-6xl">{{ partnerMood || '😊' }}</p>
      </div>
    </div>

    <!-- Статистика балів -->
    <div class="bg-white rounded-xl shadow p-6">
      <h3 class="text-lg font-medium mb-4">Статистика балів</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Бали користувачів -->
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-sm text-gray-500 mb-1">{{ currentUserLabel }}</div>
          <div class="text-3xl font-bold text-primary-600">{{ pointsStats.user }}</div>
          <div class="text-sm text-gray-500">балів</div>
        </div>
        
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-sm text-gray-500 mb-1">{{ partnerLabel }}</div>
          <div class="text-3xl font-bold text-primary-600">{{ pointsStats.partner }}</div>
          <div class="text-sm text-gray-500">балів</div>
        </div>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="mt-8">
      <h3 class="text-xl font-medium text-gray-900 mb-4">Останні транзакції</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Причина
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Сума
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="point in recentPoints" :key="point.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatDate(point.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ point.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ point.value > 0 ? '+' : '' }}{{ point.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData, initializeUserPoints } from '../firebase/database-service'

const authStore = useAuthStore()
const selectedPeriod = ref('week')

const myUid = computed(() => authStore.user?.uid)
const partnerUid = ref(null)
const partnerEmail = computed(() =>
  authStore.user?.email === 'facellesit@gmail.com'
    ? 'martadaniluk4@gmail.com'
    : 'facellesit@gmail.com'
)

// Додаємо refs для зберігання поточних балів з вузлів /points/$uid
const currentUserPoints = ref(0)
const partnerCurrentPoints = ref(0)

// Функція для отримання початку періоду
const getPeriodStart = (period) => {
  const now = Date.now()
  const periodMs = {
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  }[period]
  return new Date(now - periodMs)
}

// Реальні дані
const moods = ref([])
const tasks = ref([])
const pointsHistory = ref([])
const photos = ref([])
const currentMood = ref(null)
const partnerMood = ref(null)

// Визначаємо ID партнера
const determinePartnerUid = async () => {
  try {
    // Перевіряємо, чи authStore.user вже доступний
    if (!authStore.user) {
      // Можливо, потрібно дочекатися ініціалізації authStore, 
      // але поки що просто вийдемо, якщо user немає
      console.warn('authStore.user not available yet in StatsView.')
      return
    }

    listenToData('users', (data) => {
      if (data) {
        const uids = Object.keys(data)
        partnerUid.value = uids.find(uid => uid !== authStore.user.uid)
        console.log('Partner UID determined:', partnerUid.value)
      } else {
        console.warn('No user data received from Firebase.')
      }
    })
  } catch (error) {
    console.error('Error determining partner UID in StatsView:', error)
  }
}

// Завантаження даних з бази
onMounted(async () => {
  // Визначаємо ID партнера при завантаженні
  await determinePartnerUid()

  // Ініціалізуємо бали поточного користувача, якщо їх немає
  if (authStore.user?.uid) {
    await initializeUserPoints(authStore.user.uid);
  }

  // Підписуємось на поточні бали поточного користувача
  console.log('StatsView: Attempting to subscribe to current user points for UID:', authStore.user?.uid);
  if (authStore.user?.uid) {
    listenToData(`points/${authStore.user.uid}`, (data) => {
      if (data) {
        currentUserPoints.value = data.current || 0
        console.log(`StatsView: Received current user points (${authStore.user.uid}):`, currentUserPoints.value)
      } else {
        currentUserPoints.value = 0; // Reset if data is empty
        console.log(`StatsView: No current user points data received for ${authStore.user.uid}. Setting to 0.`);
      }
    })
  } else {
    console.warn('StatsView: Cannot subscribe to current user points, authStore.user.uid is not available during onMounted.');
  }

  // Підписуємось на поточні бали партнера після визначення partnerUid
  if (partnerUid.value) {
    listenToData(`points/${partnerUid.value}`, (data) => {
      if (data) {
        partnerCurrentPoints.value = data.current || 0
        console.log(`StatsView: Received partner current points (${partnerUid.value}):`, partnerCurrentPoints.value)
      }
    })
  }

  // Настрої
  listenToData('moodmain', (data) => {
    if (data) {
      // Конвертуємо об'єкт в масив
      const allMoods = []
      Object.entries(data).forEach(([userId, userMoods]) => {
        Object.entries(userMoods).forEach(([moodId, mood]) => {
          allMoods.push({
            id: moodId,
            userId,
            ...mood
          })
        })
      })
      moods.value = allMoods

      // mood поточного користувача
      const myMoodArr = allMoods
        .filter(m => m.userId === authStore.user.uid)
        .sort((a, b) => b.createdAt - a.createdAt)
      currentMood.value = myMoodArr.length ? myMoodArr[0].emoji || myMoodArr[0].mood || null : null
      
      // mood партнера
      const partnerUid = Object.keys(data).find(uid => uid !== authStore.user.uid)
      if (partnerUid) {
        const partnerMoodArr = allMoods
          .filter(m => m.userId === partnerUid)
          .sort((a, b) => b.createdAt - a.createdAt)
        partnerMood.value = partnerMoodArr.length ? partnerMoodArr[0].emoji || partnerMoodArr[0].mood || null : null
      }
    }
  })

  // Завдання
  listenToData('tasks', (data) => {
    if (data) {
      tasks.value = Object.entries(data).map(([id, task]) => ({ id, ...task }))
    }
  })

  // Бали (історія транзакцій)
  listenToData('points_transactions', (data) => {
    if (data) {
      pointsHistory.value = Object.entries(data).map(([id, transaction]) => ({ id, ...transaction }))
    } else {
      pointsHistory.value = []
    }
  })

  // Фотографії
  listenToData('photos', (data) => {
    if (data) {
      photos.value = Object.entries(data).map(([id, photo]) => ({ id, ...photo }))
    }
  })
})

// Статистика настрою
const moodStats = computed(() => {
  // Додано перевірки на authStore.user та partnerUid.value
  if (!moods.value || !moods.value.length || !authStore.user || !partnerUid.value) return { user: [], partner: [] }
  
  const periodStart = getPeriodStart(selectedPeriod.value)
  const filteredMoods = moods.value.filter(mood => 
    new Date(mood.createdAt) >= periodStart
  )

  // Розділяємо настрій по користувачах за UID
  const userMoods = filteredMoods.filter(m => m.userId === authStore.user.uid)
  const partnerMoods = filteredMoods.filter(m => m.userId === partnerUid.value)

  // Рахуємо статистику для кожного користувача
  const calculateMoodStats = (moods) => {
    const total = moods.length
    if (total === 0) return []

    const stats = {}
    moods.forEach(mood => {
      const moodValue = mood.emoji || mood.mood
      if (!stats[moodValue]) {
        stats[moodValue] = { count: 0, percentage: 0 }
      }
      stats[moodValue].count++
    })

    return Object.entries(stats).map(([mood, data]) => ({
      mood,
      count: data.count,
      percentage: Math.round((data.count / total) * 100)
    }))
  }

  return {
    user: calculateMoodStats(userMoods),
    partner: calculateMoodStats(partnerMoods)
  }
})

// Оновлюємо computed властивість pointsStats
const pointsStats = computed(() => {
  // Використовуємо currentUserPoints та partnerCurrentPoints для загального балансу
  const userPoints = currentUserPoints.value
  const partnerPoints = partnerCurrentPoints.value

  if (!pointsHistory.value || !authStore.user || !partnerUid.value) return { 
    user: userPoints, 
    partner: partnerPoints,
    givenByUser: 0,
    givenByPartner: 0
  }
  
  const periodStart = getPeriodStart(selectedPeriod.value)
  const filteredPoints = pointsHistory.value.filter(point => 
    new Date(point.timestamp) >= periodStart
  )

  // Рахуємо скільки балів додав кожен з транзакцій
  const givenByUser = filteredPoints
    // Знаходимо транзакції, ініційовані поточним користувачем для партнера
    .filter(p => p.userEmail === authStore.user.email && p.userId === partnerUid.value && p.amount > 0) // Додаємо перевірку amount > 0
    .reduce((sum, p) => sum + p.amount, 0)

  const givenByPartner = filteredPoints
    // Знаходимо транзакції, ініційовані партнером для поточного користувача
    .filter(p => p.userEmail === partnerEmail.value && p.userId === authStore.user.uid && p.amount > 0) // Додаємо перевірку amount > 0
    .reduce((sum, p) => sum + p.amount, 0)

  return {
    user: userPoints,
    partner: partnerPoints,
    givenByUser,
    givenByPartner
  }
})

// Завдання
const completedTasks = computed(() => {
  const now = Date.now()
  const periodMs = {
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  }[selectedPeriod.value]

  // Фільтруємо завдання за періодом та статусом
  return tasks.value.filter(t => 
    t.status === 'completed' && 
    t.createdAt && 
    (now - t.createdAt) <= periodMs
  ).length
})

const pendingTasks = computed(() => {
  const now = Date.now()
  const periodMs = {
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  }[selectedPeriod.value]

  // Фільтруємо завдання за періодом та статусом
  return tasks.value.filter(t => 
    t.status === 'pending' && 
    t.createdAt && 
    (now - t.createdAt) <= periodMs
  ).length
})

const taskCompletionRate = computed(() => {
  const total = completedTasks.value + pendingTasks.value
  return total > 0 ? Math.round((completedTasks.value / total) * 100) : 0
})

// Загальна кількість балів (беремо з currentUserPoints)
const totalPoints = computed(() => currentUserPoints.value)

const recentPoints = computed(() => {
  // Фільтруємо транзакції балів за періодом та форматуємо для відображення
  const now = Date.now()
  const periodMs = {
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  }[selectedPeriod.value]

   return pointsHistory.value
    .filter(p => p.timestamp && (now - p.timestamp) <= periodMs)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5) // Обмежуємо до 5 останніх транзакцій
    .map(p => ({
      id: p.id,
      description: p.reason || 
                   (p.type === 'reward' ? `Отримано ${p.amount} балів` : 
                    p.type === 'transfer' ? `Передача ${p.amount} балів` : 
                    p.type === 'purchase' ? `Купівля на ${Math.abs(p.amount)} балів` : 
                    'Транзакція'), // Використовуємо reason або генеруємо з type
      value: p.amount,
      date: new Date(p.timestamp)
    }))
})

// Таймлайн активності
const activityTimeline = computed(() => {
  const now = Date.now()
  const periodMs = {
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  }[selectedPeriod.value]

  const activities = []

  // Додаємо активності з завдань
  tasks.value
    .filter(t => t.createdAt && (now - t.createdAt) <= periodMs)
    .forEach(t => {
      activities.push({
        id: 'task-' + t.id,
        type: 'task',
        icon: '✓',
        description: `Завершено завдання "${t.title}"`, // Використовуємо task.title
        date: new Date(t.createdAt),
        // Визначаємо автора за userId завдання
        author: t.userId === authStore.user.uid ? 
                (authStore.user.email === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня') : 
                (partnerEmail.value === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня')
      })
    })

  // Додаємо активності з настроїв
  moods.value
    .filter(m => m.createdAt && (now - m.createdAt) <= periodMs)
    .forEach(mood => {
      activities.push({
        id: 'mood-' + mood.id,
        type: 'mood',
        icon: mood.emoji || '😐',
        description: `Відмічено настрій: ${mood.emoji || mood.mood}`, // Використовуємо mood.emoji/mood
        date: new Date(mood.createdAt),
        // Визначаємо автора за userId настрою
        author: mood.userId === authStore.user.uid ? 
                (authStore.user.email === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня') : 
                (partnerEmail.value === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня')
      })
    })

  // Додаємо активності з балів
  pointsHistory.value
    .filter(p => p.timestamp && (now - p.timestamp) <= periodMs)
    .forEach(point => {
      // Визначаємо автора на основі того, кого стосується транзакція (userId)
      const authorUid = point.userId
      const author = authorUid === authStore.user.uid ? 
        (authStore.user.email === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня') : 
        (partnerEmail.value === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня') // Логіка визначення Зайчик/Кицюня

      activities.push({
        id: 'points-' + point.id,
        type: 'points',
        icon: '★',
        description: `${point.amount > 0 ? 'Отримано' : 'Списано'} ${Math.abs(point.amount)} балів: ${point.reason || 'Транзакція'}`,
        date: new Date(point.timestamp),
        author
      })
    })

  // Додаємо активності з фотографій
  photos.value
    .filter(p => p.createdAt && (now - p.createdAt) <= periodMs)
    .forEach(photo => {
      activities.push({
        id: 'photo-' + photo.id,
        type: 'photo',
        icon: '📸',
        description: `Додано фото: ${photo.description || 'Без опису'}`,
        date: new Date(photo.createdAt),
        // Визначаємо автора за userId фото
        author: photo.userId === authStore.user.uid ? 
                (authStore.user.email === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня') : 
                (partnerEmail.value === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня')
      })
    })

  return activities.sort((a, b) => b.date - a.date).slice(0, 15)
})

const getActivityTypeClass = (type) => {
  switch (type) {
    case 'task':
      return 'bg-green-500 text-white'
    case 'mood':
      return 'bg-blue-500 text-white'
    case 'points':
      return 'bg-yellow-500 text-white'
    case 'photo':
      return 'bg-purple-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit'
  }).format(date)
}

// Mood comparison
const showMoodSelector = ref(false)

// Додаємо computed властивості для визначення, хто є Зайчик, а хто - Кицюня
const isCurrentUserBunny = computed(() => authStore.user?.email === 'facellesit@gmail.com')
const isPartnerBunny = computed(() => partnerEmail.value === 'facellesit@gmail.com')

const currentUserLabel = computed(() => isCurrentUserBunny.value ? 'Зайчик' : 'Кицюня')
const partnerLabel = computed(() => isPartnerBunny.value ? 'Зайчик' : 'Кицюня')
</script>

<style scoped>
.activity-icon {
  @apply h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white;
}
</style> 