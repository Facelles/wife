<template>
  <div class="space-y-6">
    <!-- Stats header -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900">Детальна аналітика</h2>
        
        <!-- Date range selector -->
        <div class="mt-4 flex items-center space-x-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Період</label>
            <select
              v-model="selectedRange"
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
            <div v-for="mood in moodStats" :key="mood.value" class="flex items-center justify-between">
              <div class="flex items-center">
                <span class="text-2xl mr-2">{{ mood.emoji }}</span>
                <span class="text-sm text-gray-500">{{ mood.label }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    class="bg-primary-600 h-2 rounded-full"
                    :style="{ width: `${mood.percentage}%` }"
                  ></div>
                </div>
                <span class="text-sm text-gray-500">{{ mood.count }}</span>
              </div>
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
          {{ authStore.user?.email === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня' }}
        </h3>
        <p class="text-4xl md:text-6xl">{{ currentMood || '😊' }}</p>
      </div>
      <!-- mood партнера -->
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up">
        <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">
          {{ authStore.user?.email === 'facellesit@gmail.com' ? 'Кицюня' : 'Зайчик' }}
        </h3>
        <p class="text-4xl md:text-6xl">{{ partnerMood || '😊' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData } from '../firebase/database-service'

const authStore = useAuthStore()
const selectedRange = ref('week')

// Реальні дані
const moods = ref([])
const tasks = ref([])
const pointsHistory = ref([])

// Завантаження даних з бази
onMounted(() => {
  // Настрої
  listenToData('moods', (data) => {
    if (data) {
      moods.value = Object.entries(data).map(([id, mood]) => ({ id, ...mood }))
    }
  })
  // Завдання
  listenToData('tasks', (data) => {
    if (data) {
      tasks.value = Object.entries(data).map(([id, task]) => ({ id, ...task }))
    }
  })
})

// Статистика настрою
const moodStats = computed(() => {
  const stats = [
    { value: 'terrible', emoji: '😢', label: 'Дуже погано', count: 0 },
    { value: 'bad', emoji: '😕', label: 'Погано', count: 0 },
    { value: 'neutral', emoji: '😐', label: 'Нормально', count: 0 },
    { value: 'good', emoji: '🙂', label: 'Добре', count: 0 },
    { value: 'great', emoji: '😊', label: 'Чудово', count: 0 }
  ]
  moods.value.forEach(mood => {
    const found = stats.find(s => s.value === mood.value)
    if (found) found.count++
  })
  const total = stats.reduce((sum, s) => sum + s.count, 0)
  stats.forEach(s => s.percentage = total ? Math.round((s.count / total) * 100) : 0)
  return stats
})

// Завдання
const completedTasks = computed(() => tasks.value.filter(t => t.status === 'completed').length)
const pendingTasks = computed(() => tasks.value.filter(t => t.status === 'pending').length)
const taskCompletionRate = computed(() => {
  const total = completedTasks.value + pendingTasks.value
  return total > 0 ? Math.round((completedTasks.value / total) * 100) : 0
})

// Бали (сума points у виконаних завданнях)
const totalPoints = computed(() => {
  return tasks.value.filter(t => t.status === 'completed').reduce((sum, t) => sum + (t.points || 0), 0)
})
const recentPoints = computed(() => {
  return tasks.value
    .filter(t => t.status === 'completed' && t.points)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)
    .map(t => ({
      id: t.id,
      description: `Завершення завдання: ${t.title}`,
      value: t.points,
      date: new Date(t.createdAt)
    }))
})

// Таймлайн активності (завершення завдань, зміна настрою, нарахування балів)
const activityTimeline = computed(() => {
  const activities = []
  tasks.value.forEach(t => {
    if (t.status === 'completed') {
      activities.push({
        id: 'task-' + t.id,
        type: 'task',
        icon: '✓',
        description: `Завершено завдання "${t.title}"`,
        date: new Date(t.createdAt)
      })
      if (t.points) {
        activities.push({
          id: 'points-' + t.id,
          type: 'points',
          icon: '★',
          description: `Отримано ${t.points} балів за "${t.title}"`,
          date: new Date(t.createdAt)
        })
      }
    }
  })
  moods.value.forEach(mood => {
    activities.push({
      id: 'mood-' + mood.id,
      type: 'mood',
      icon: mood.emoji || '😐',
      description: `Відмічено настрій: ${mood.emoji || mood.value}`,
      date: new Date(mood.timestamp || mood.createdAt)
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
const currentMood = ref(null)
const partnerMood = ref(null)

const showMoodSelector = ref(false)
</script>

<style scoped>
.activity-icon {
  @apply h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white;
}
</style> 