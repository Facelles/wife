<template>
  <div class="space-y-6 max-w-2xl mx-auto px-4 py-8">
    <!-- Today's mood -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Як ви почуваєтесь сьогодні?</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            v-for="mood in moods"
            :key="mood.value"
            @click="selectMood(mood)"
            :class="[
              'flex flex-col items-center p-4 rounded-lg border-2 transition-colors',
              currentMood?.value === mood.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            ]"
          >
            <span class="text-4xl mb-2">{{ mood.emoji }}</span>
            <span class="text-sm font-medium text-gray-700">{{ mood.label }}</span>
          </button>
        </div>
        <!-- Mood note -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700">Додайте нотатку про свій день</label>
          <textarea
            v-model="moodNote"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Що у вас на думці?"
          ></textarea>
          <button
            @click="saveMood"
            class="mt-4 btn btn-primary"
          >
            Зберегти настрій
          </button>
        </div>
      </div>
    </div>

    <!-- Mood history -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Історія настрою</h3>
        <div class="space-y-4">
          <div
            v-for="entry in moodHistory"
            :key="entry.id"
            class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <span class="text-2xl">
              {{ moods.find(m => m.value === entry.value)?.emoji || entry.emoji }}
            </span>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <span class="font-medium">
                  {{ moods.find(m => m.value === entry.value)?.label || '' }}
                  <span class="ml-2 text-xs text-pink-500">{{ getUserLabel(entry.userEmail) }}</span>
                </span>
                <span class="text-sm text-gray-500">
                  {{ entry.createdAt ? formatDate(entry.createdAt) : '' }}
                </span>
              </div>
              <p v-if="entry.note && entry.note.trim()" class="mt-1 text-sm text-gray-600">
                {{ entry.note }}
              </p>
            </div>
          </div>
          <div v-if="!moodHistory.length" class="text-center text-gray-500 py-4">
            Поки що немає записів
          </div>
        </div>
      </div>
    </div>

    <!-- Mood statistics -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Статистика настрою</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            v-for="mood in moods"
            :key="mood.value"
            class="p-4 bg-gray-50 rounded-lg text-center"
          >
            <span class="text-2xl block mb-2">{{ mood.emoji }}</span>
            <span class="text-sm font-medium text-gray-700">{{ mood.label }}</span>
            <span class="block text-lg font-semibold text-primary-600 mt-1">
              {{ getMoodCount(mood.value) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData } from '../firebase/database-service'

const authStore = useAuthStore()
const moodNote = ref('')
const currentMood = ref(null)
const moodHistory = ref([])

const moods = [
  { value: 'bad', emoji: '😢', label: 'Дуже погано' },
  { value: 'not_good', emoji: '😕', label: 'Погано' },
  { value: 'normal', emoji: '😐', label: 'Нормально' },
  { value: 'good', emoji: '🙂', label: 'Добре' },
  { value: 'great', emoji: '😄', label: 'Чудово' }
]

onMounted(() => {
  if (!authStore.user) return
  listenToData(`moods/${authStore.user.uid}`, (data) => {
    let allMoods = []
    if (data) {
      allMoods = Object.values(data)
        .map(mood => ({
          ...mood,
          createdAt: mood.createdAt || mood.timestamp || 0
        }))
    }
    moodHistory.value = allMoods
      .filter(m => m.value)
      .sort((a, b) => b.createdAt - a.createdAt)
    if (moodHistory.value.length) {
      const found = moods.find(m => m.value === moodHistory.value[0].value)
      currentMood.value = found || null
    } else {
      currentMood.value = null
    }
  })
})

const selectMood = (mood) => {
  currentMood.value = mood
}

const saveMood = async () => {
  if (!currentMood.value || !authStore.user) return
  try {
    await pushData(`moods/${authStore.user.uid}`, {
      value: currentMood.value.value,
      emoji: currentMood.value.emoji,
      note: moodNote.value.trim(),
      createdAt: Date.now(),
      timestamp: Date.now(),
      userId: authStore.user.uid,
      userEmail: authStore.user.email
    })
    moodNote.value = ''
    currentMood.value = null
  } catch (error) {
    console.error('Помилка при збереженні настрою:', error)
    alert('Помилка при збереженні настрою')
  }
}

const getMoodCount = (value) => {
  return moodHistory.value.filter(entry => entry.value === value).length
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString()
}

const getUserLabel = (email) => {
  if (!email) return ''
  if (email.includes('facellesit')) return 'Зайчик'
  if (email.includes('martadaniluk4')) return 'Кицюня'
  return email
}
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2;
}
.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
}
</style>