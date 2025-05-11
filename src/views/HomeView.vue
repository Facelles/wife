<template>
  <div class="space-y-12 animate-fade-in max-w-4xl mx-auto">
    <!-- Welcome Section -->
    <div class="text-center animate-slide-down">
      <h1 class="text-5xl md:text-6xl font-light text-gray-900 mb-4 hover:text-primary-600 transition-colors duration-300">
        Кицюня з зайчиком
      </h1>
      <p class="text-xl md:text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-300">
        Ваші спільні моменти 💕
      </p>
    </div>

    <!-- Chat Section -->
    <div class="space-y-4 px-4 md:px-8">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Чат</h2>
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 animate-slide-up flex justify-center">
        <router-link to="/chat" class="flex items-center space-x-4 px-6 py-3 bg-primary-100 rounded-xl shadow hover:bg-primary-200 transition-colors">
          <span class="material-icons text-3xl text-primary-500">chat</span>
          <span class="font-light text-gray-700 text-lg md:text-xl">Перейти до чату</span>
        </router-link>
      </div>
    </div>

    <!-- Mood Section -->
    <div class="space-y-4 px-4 md:px-8">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Настрій</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up cursor-pointer hover:shadow-lg transition"
          @click="showMoodSelector = true"
        >
          <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">{{ authStore.user?.email === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня' }}</h3>
          <p class="text-4xl md:text-6xl">{{ currentMood || '😊' }}</p>
        </div>
        <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up">
          <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">{{ authStore.user?.email === 'facellesit@gmail.com' ? 'Кицюня' : 'Зайчик' }}</h3>
          <p class="text-4xl md:text-6xl">{{ partnerMood || '😊' }}</p>
        </div>
      </div>
    </div>

    <!-- Photos Section -->
    <div class="space-y-4 px-4 md:px-8">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Світлини</h2>
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 animate-slide-up flex justify-center">
        <router-link to="/photos" class="flex items-center space-x-4 px-6 py-3 bg-primary-100 rounded-xl shadow hover:bg-primary-200 transition-colors">
          <span class="material-icons text-3xl text-primary-500">photo_camera</span>
          <span class="font-light text-gray-700 text-lg md:text-xl">Перейти до галереї</span>
        </router-link>
      </div>
    </div>

    <!-- Sleep Section -->
    <div class="space-y-4 px-4 md:px-8">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Сон</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up cursor-pointer hover:shadow-lg transition"
          @click="showSleepSelector = true"
        >
          <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">{{ authStore.user?.email === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня' }}</h3>
          <p class="text-4xl md:text-6xl">{{ currentSleep || '😴' }}</p>
        </div>
        <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up">
          <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">{{ authStore.user?.email === 'facellesit@gmail.com' ? 'Кицюня' : 'Зайчик' }}</h3>
          <p class="text-4xl md:text-6xl">{{ partnerSleep || '😴' }}</p>
        </div>
      </div>
    </div>

    <!-- Tasks Section -->
    <div class="space-y-4 px-4 md:px-8">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Завдання</h2>
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 animate-slide-up flex justify-center">
        <router-link to="/tasks" class="flex items-center space-x-4 px-6 py-3 bg-primary-100 rounded-xl shadow hover:bg-primary-200 transition-colors">
          <span class="material-icons text-3xl text-primary-500">assignment</span>
          <span class="font-light text-gray-700 text-lg md:text-xl">Перейти до завдань</span>
        </router-link>
      </div>
    </div>

    <!-- Points Section -->
    <div class="space-y-4 px-4 md:px-8">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Бали</h2>
      <div class="group bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center animate-slide-up">
        <h3 class="text-sm md:text-base font-light text-gray-400 mb-3 group-hover:text-primary-500 transition-colors duration-300">Ваші бали</h3>
        <p class="text-4xl md:text-6xl font-light text-gray-800 group-hover:text-primary-600 transition-colors duration-300">{{ points }}</p>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="space-y-4 px-4 md:px-8">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Статистика</h2>
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 animate-slide-up flex justify-center">
        <router-link to="/stats" class="flex items-center space-x-4 px-6 py-3 bg-primary-100 rounded-xl shadow hover:bg-primary-200 transition-colors">
          <span class="material-icons text-3xl text-primary-500">bar_chart</span>
          <span class="font-light text-gray-700 text-lg md:text-xl">Перейти до статистики</span>
        </router-link>
      </div>
    </div>

    <!-- Mood Selector Modal -->
    <div v-if="showMoodSelector" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
        <h3 class="text-xl font-medium text-gray-900 mb-4">Виберіть настрій</h3>
        <div class="grid grid-cols-5 gap-4">
          <button
            v-for="(moodData, emoji) in moods"
            :key="emoji"
            @click="selectMood(emoji)"
            :class="[
              'p-4 text-3xl rounded-lg transition-colors',
              currentMood === emoji ? 'bg-primary-100 ring-2 ring-primary-500' : 'hover:bg-gray-100'
            ]"
          >
            {{ emoji }}
          </button>
        </div>
        <button
          @click="showMoodSelector = false"
          class="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Скасувати
        </button>
      </div>
    </div>

    <!-- Sleep Selector Modal -->
    <div v-if="showSleepSelector" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
        <h3 class="text-xl font-medium text-gray-900 mb-4">Оцініть якість сну</h3>
        <div class="grid grid-cols-5 gap-4 mb-6">
          <button
            v-for="sleep in ['😴', '😌', '😑', '😫', '🥱']"
            :key="sleep"
            @click="selectSleep(sleep)"
            :class="[
              'p-4 text-3xl rounded-lg transition-colors',
              currentSleep === sleep ? 'bg-primary-100 ring-2 ring-primary-500' : 'hover:bg-gray-100'
            ]"
          >
            {{ sleep }}
          </button>
        </div>
        <button
          @click="showSleepSelector = false"
          class="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Скасувати
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDevice } from '../composables/useDevice'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData } from '../firebase/database-service'

const { isMobile, isDesktop } = useDevice()
const authStore = useAuthStore()

const points = ref(0)
const currentMood = ref(null)
const partnerMood = ref(null)
const currentSleep = ref(null)
const partnerSleep = ref(null)
const showMoodSelector = ref(false)
const showSleepSelector = ref(false)

// Визначаємо, хто є хто
const isKitty = computed(() => authStore.user?.email === 'soulfacelles@gmail.com')

// Визначаємо можливі настрої
const moods = {
  '😊': { value: 'great', emoji: '😊' },
  '🙂': { value: 'good', emoji: '🙂' },
  '😐': { value: 'neutral', emoji: '😐' },
  '😕': { value: 'bad', emoji: '😕' },
  '😢': { value: 'terrible', emoji: '😢' }
}

// Опції для сну
const sleepOptions = [
  { value: 'perfect', emoji: '🌟' },
  { value: 'good', emoji: '😊' },
  { value: 'normal', emoji: '😐' },
  { value: 'bad', emoji: '😫' },
  { value: 'awful', emoji: '😴' }
]

// Визначаємо стани настрою та сну
const sleepStates = {
  '😴': { value: 'great', emoji: '😴' },
  '😌': { value: 'good', emoji: '😌' },
  '😑': { value: 'neutral', emoji: '😑' },
  '😫': { value: 'bad', emoji: '😫' },
  '🥱': { value: 'terrible', emoji: '🥱' }
}

// Слухаємо зміни даних
onMounted(() => {
  if (authStore.user) {
    // Слухаємо зміни настрою для конкретного користувача
    listenToData(`moods/${authStore.user.uid}`, (data) => {
      if (data) {
        const moodEntries = Object.entries(data)
          .map(([id, mood]) => ({
            id,
            ...mood,
            timestamp: new Date(mood.timestamp)
          }))
          .sort((a, b) => b.timestamp - a.timestamp)

        if (moodEntries.length > 0) {
          currentMood.value = moodEntries[0].emoji
        }
      }
    })

    // Слухаємо зміни сну для конкретного користувача
    listenToData(`sleepmain/${authStore.user.uid}`, (data) => {
      if (data) {
        const sleepEntries = Object.entries(data)
          .map(([id, sleep]) => ({
            id,
            ...sleep,
            timestamp: new Date(sleep.timestamp)
          }))
          .sort((a, b) => b.timestamp - a.timestamp)

        if (sleepEntries.length > 0) {
          currentSleep.value = sleepEntries[0].emoji
        }
      }
    })
  }
})

// Вибір настрою
const selectMood = async (mood) => {
  console.log('Setting mood:', mood)
  if (!authStore.user) return
  
  try {
    // Зберігаємо в підпапці користувача
    await pushData(`moods/${authStore.user.uid}`, {
      value: moods[mood].value,
      emoji: mood,
      timestamp: Date.now(),
      userId: authStore.user.uid,
      userEmail: authStore.user.email
    })
    currentMood.value = mood
  } catch (error) {
    console.error('Error setting mood:', error)
  }
}

// Вибір якості сну
const selectSleep = async (sleep) => {
  console.log('Setting sleep:', sleep)
  if (!authStore.user) return
  
  try {
    // Зберігаємо в sleepmain
    await pushData(`sleepmain/${authStore.user.uid}`, {
      value: sleepStates[sleep].value,
      emoji: sleep,
      timestamp: Date.now(),
      userId: authStore.user.uid,
      userEmail: authStore.user.email
    })
    currentSleep.value = sleep
  } catch (error) {
    console.error('Error setting sleep:', error)
  }
}

// Дії
const actions = [
  { 
    to: '#', 
    icon: 'add_circle', 
    text: 'Додати бали',
    action: () => {
      // TODO: Додати логіку для балів
    }
  },
  { 
    to: '#', 
    icon: 'mood', 
    text: 'Настрій',
    action: () => showMoodSelector.value = true
  },
  { 
    to: '#', 
    icon: 'bedtime', 
    text: 'Сон',
    action: () => showSleepSelector.value = true
  },
  { 
    to: '/tasks', 
    icon: 'assignment', 
    text: 'Завдання'
  },
  { 
    to: '/chat', 
    icon: 'chat', 
    text: 'Повідомлення'
  },
  { 
    to: '/photos', 
    icon: 'photo_camera', 
    text: 'Світлини'
  },
  { 
    to: '/stats', 
    icon: 'bar_chart', 
    text: 'Статистика'
  }
]

const desktopFeatures = [
  { icon: 'calendar_today', text: 'Календар подій' },
  { icon: 'photo_library', text: 'Галерея фото' },
  { icon: 'playlist_add_check', text: 'Розширені завдання' },
  { icon: 'analytics', text: 'Детальна аналітика' }
]
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

.animate-slide-down {
  animation: slideDown 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
</style> 