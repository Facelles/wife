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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const selectedRange = ref('week')

// Моки даних для прикладу
const moodStats = ref([
  { value: 1, emoji: '😢', label: 'Дуже погано', count: 2, percentage: 10 },
  { value: 2, emoji: '😕', label: 'Погано', count: 3, percentage: 15 },
  { value: 3, emoji: '😐', label: 'Нормально', count: 5, percentage: 25 },
  { value: 4, emoji: '🙂', label: 'Добре', count: 6, percentage: 30 },
  { value: 5, emoji: '😄', label: 'Чудово', count: 4, percentage: 20 }
])

const completedTasks = ref(15)
const pendingTasks = ref(5)
const taskCompletionRate = computed(() => {
  const total = completedTasks.value + pendingTasks.value
  return total > 0 ? Math.round((completedTasks.value / total) * 100) : 0
})

const totalPoints = ref(1250)
const recentPoints = ref([
  { id: 1, description: 'Завершення завдання', value: 50, date: new Date() },
  { id: 2, description: 'Щоденний настрій', value: 10, date: new Date() },
  { id: 3, description: 'Пропущений день', value: -20, date: new Date() },
  { id: 4, description: 'Бонус за серію', value: 100, date: new Date() }
])

const activityTimeline = ref([
  {
    id: 1,
    type: 'task',
    icon: '✓',
    description: 'Завершено завдання "Прибирання"',
    date: new Date()
  },
  {
    id: 2,
    type: 'mood',
    icon: '😄',
    description: 'Відмічено чудовий настрій',
    date: new Date()
  },
  {
    id: 3,
    type: 'points',
    icon: '★',
    description: 'Отримано 100 балів за серію',
    date: new Date()
  }
])

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

onMounted(() => {
  // Тут можна додати завантаження реальних даних
})
</script>

<style scoped>
.activity-icon {
  @apply h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white;
}
</style> 