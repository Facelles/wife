<template>
  <div class="space-y-12 animate-fade-in max-w-7xl mx-auto">
    <!-- Welcome Section -->
    <div class="text-center animate-slide-down">
      <h1 class="text-5xl md:text-6xl font-light text-gray-900 mb-4 hover:text-primary-600 transition-colors duration-300">
        Кицюня з зайчиком
      </h1>
      <p class="text-xl md:text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-300">
        Ваші спільні моменти 💕
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
      <div class="group bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up cursor-pointer">
        <h3 class="text-sm md:text-base font-light text-gray-400 mb-3 group-hover:text-primary-500 transition-colors duration-300">Бали</h3>
        <p class="text-4xl md:text-6xl font-light text-gray-800 group-hover:text-primary-600 transition-colors duration-300">{{ points }}</p>
      </div>
      
      <div @click="showMoodSelector = true" class="group bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up delay-100 cursor-pointer">
        <h3 class="text-sm md:text-base font-light text-gray-400 mb-3 group-hover:text-primary-500 transition-colors duration-300">Настрій</h3>
        <p class="text-4xl md:text-6xl group-hover:scale-125 transition-transform duration-300">{{ currentMood || '😊' }}</p>
      </div>
      
      <div @click="showSleepSelector = true" class="group bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up delay-200 cursor-pointer">
        <h3 class="text-sm md:text-base font-light text-gray-400 mb-3 group-hover:text-primary-500 transition-colors duration-300">Сон</h3>
        <p class="text-4xl md:text-6xl group-hover:scale-125 transition-transform duration-300">{{ currentSleep || '😴' }}</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="space-y-8 px-4 md:px-8">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Дії</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <router-link 
          v-for="(action, index) in actions" 
          :key="action.to" 
          :to="action.to"
          :style="{ animationDelay: `${index * 100}ms` }"
          class="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 flex items-center justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up"
        >
          <span class="material-icons text-gray-400 mr-3 text-2xl md:text-3xl group-hover:text-primary-500 transition-colors duration-300">
            {{ action.icon }}
          </span>
          <span class="font-light text-gray-600 text-lg md:text-xl group-hover:text-primary-600 transition-colors duration-300">
            {{ action.text }}
          </span>
        </router-link>
      </div>
    </div>

    <!-- Додаткові функції для десктопної версії -->
    <div v-if="isDesktop" class="space-y-8 px-4 md:px-8">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">
        Додаткові можливості
      </h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div
          v-for="feature in desktopFeatures"
          :key="feature.text"
          class="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up"
        >
          <span class="material-icons text-4xl text-primary-500 mb-4 group-hover:scale-110 transition-transform duration-300">
            {{ feature.icon }}
          </span>
          <span class="font-light text-gray-600 text-lg md:text-xl text-center group-hover:text-primary-600 transition-colors duration-300">
            {{ feature.text }}
          </span>
        </div>
      </div>
    </div>

    <!-- Модальне вікно для вибору настрою -->
    <div v-if="showMoodSelector" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-96">
        <h3 class="text-xl font-semibold mb-4">Виберіть настрій</h3>
        <div class="grid grid-cols-5 gap-4">
          <button
            v-for="mood in moods"
            :key="mood.value"
            @click="selectMood(mood)"
            class="text-3xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {{ mood.emoji }}
          </button>
        </div>
        <button @click="showMoodSelector = false" class="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
          Закрити
        </button>
      </div>
    </div>

    <!-- Модальне вікно для вибору якості сну -->
    <div v-if="showSleepSelector" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-96">
        <h3 class="text-xl font-semibold mb-4">Оцініть якість сну</h3>
        <div class="grid grid-cols-5 gap-4">
          <button
            v-for="sleep in sleepQuality"
            :key="sleep.value"
            @click="selectSleep(sleep)"
            class="text-3xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {{ sleep.emoji }}
          </button>
        </div>
        <button @click="showSleepSelector = false" class="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
          Закрити
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDevice } from '../composables/useDevice'
import { useAuthStore } from '../stores/auth'
import { addMetric } from '../firebase/metrics-service'

const { isMobile, isDesktop } = useDevice()
const authStore = useAuthStore()

const points = ref(0)
const currentMood = ref(null)
const currentSleep = ref(null)
const showMoodSelector = ref(false)
const showSleepSelector = ref(false)

const actions = [
  { to: '/points', icon: 'add_circle', text: 'Додати бали' },
  { to: '/mood', icon: 'mood', text: 'Настрій' },
  { to: '/sleep', icon: 'bedtime', text: 'Сон' },
  { to: '/tasks', icon: 'assignment', text: 'Завдання' },
  { to: '/chat', icon: 'chat', text: 'Повідомлення' },
  { to: '/stats', icon: 'bar_chart', text: 'Статистика' }
]

const desktopFeatures = [
  { icon: 'calendar_today', text: 'Календар подій' },
  { icon: 'photo_library', text: 'Галерея фото' },
  { icon: 'playlist_add_check', text: 'Розширені завдання' },
  { icon: 'analytics', text: 'Детальна аналітика' }
]

const moods = [
  { value: 1, emoji: '😢', label: 'Дуже погано' },
  { value: 2, emoji: '😕', label: 'Погано' },
  { value: 3, emoji: '😐', label: 'Нормально' },
  { value: 4, emoji: '🙂', label: 'Добре' },
  { value: 5, emoji: '😄', label: 'Чудово' }
]

const sleepQuality = [
  { value: 1, emoji: '😴', label: 'Дуже погано' },
  { value: 2, emoji: '🛏️', label: 'Погано' },
  { value: 3, emoji: '💤', label: 'Нормально' },
  { value: 4, emoji: '✨', label: 'Добре' },
  { value: 5, emoji: '🌟', label: 'Чудово' }
]

const selectMood = async (mood) => {
  if (!authStore.user) return
  
  const success = await addMetric(authStore.user.uid, 'mood', mood.value)
  if (success) {
    currentMood.value = mood.emoji
    showMoodSelector.value = false
  }
}

const selectSleep = async (sleep) => {
  if (!authStore.user) return
  
  const success = await addMetric(authStore.user.uid, 'sleep', sleep.value)
  if (success) {
    currentSleep.value = sleep.emoji
    showSleepSelector.value = false
  }
}
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