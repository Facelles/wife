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
        <p class="text-4xl md:text-6xl font-light text-gray-800 group-hover:text-primary-600 transition-colors duration-300">0</p>
      </div>
      
      <div class="group bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up delay-100 cursor-pointer">
        <h3 class="text-sm md:text-base font-light text-gray-400 mb-3 group-hover:text-primary-500 transition-colors duration-300">Настрій</h3>
        <p class="text-4xl md:text-6xl group-hover:scale-125 transition-transform duration-300">😊</p>
      </div>
      
      <div class="group bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up delay-200 cursor-pointer">
        <h3 class="text-sm md:text-base font-light text-gray-400 mb-3 group-hover:text-primary-500 transition-colors duration-300">Сон</h3>
        <p class="text-4xl md:text-6xl font-light text-gray-800 group-hover:text-primary-600 transition-colors duration-300">0</p>
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
  </div>
</template>

<script setup>
import { useDevice } from '../composables/useDevice'

const { isMobile, isDesktop } = useDevice()

const actions = [
  { to: '/points', icon: 'add_circle', text: 'Додати бали' },
  { to: '/mood', icon: 'mood', text: 'Настрій' },
  { to: '/sleep', icon: 'bedtime', text: 'Сон' },
  { to: '/tasks', icon: 'assignment', text: 'Завдання' },
  { to: '/chat', icon: 'chat', text: 'Повідомлення' },
  { to: '/stats', icon: 'bar_chart', text: 'Статистика' }
]

// Додаткові функції для десктопної версії
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