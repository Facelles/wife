<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import { useDevice } from './composables/useDevice'

const authStore = useAuthStore()
const router = useRouter()
const { isMobile, isDesktop } = useDevice()

const navigation = [
  { name: 'Головна', href: '/', icon: 'home' },
  { name: 'Бали', href: '/points', icon: 'favorite' },
  { name: 'Настрій', href: '/mood', icon: 'mood' },
  { name: 'Сон', href: '/sleep', icon: 'bedtime' },
  { name: 'Завдання', href: '/tasks', icon: 'check_circle' },
  { name: 'Чат', href: '/chat', icon: 'chat' },
  { name: 'Статистика', href: '/stats', icon: 'bar_chart' }
]

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
    <!-- Desktop Navigation -->
    <nav v-if="authStore.isAuthenticated && !isMobile" 
         class="fixed w-full top-0 z-50 animate-fade-in bg-white/70 backdrop-blur-sm shadow-sm">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="flex justify-between h-16 md:h-20 items-center">
          <router-link to="/" class="text-xl md:text-2xl font-light text-primary-600 hover:text-primary-700 transition-colors duration-300">
            Кицюня з зайчиком
          </router-link>
          
          <div class="hidden md:flex space-x-2">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="group px-4 py-2 rounded-full text-sm md:text-base font-light transition-all duration-300 hover:bg-white/50 hover:backdrop-blur-sm flex items-center space-x-2"
              :class="[$route.path === item.href ? 'text-primary-600 bg-primary-50' : 'text-gray-500']"
            >
              <span class="material-icons text-lg md:text-xl group-hover:scale-110 transition-transform duration-300">
                {{ item.icon }}
              </span>
              <span>{{ item.name }}</span>
            </router-link>
          </div>

          <div class="flex items-center space-x-4">
            <span class="text-gray-500 hidden sm:inline font-light text-lg">{{ authStore.currentUser?.name }}</span>
            <button
              @click="handleLogout"
              class="group px-4 py-2 rounded-full text-sm md:text-base font-light text-gray-500 hover:text-primary-600 hover:bg-white/50 hover:backdrop-blur-sm transition-all duration-300 flex items-center space-x-2"
            >
              <span>Вийти</span>
              <span class="material-icons group-hover:rotate-180 transition-transform duration-500">logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation -->
    <div v-if="authStore.isAuthenticated && isMobile" 
         class="fixed bottom-4 left-4 right-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg z-50 animate-slide-up">
      <div class="flex justify-around items-center h-16">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="group flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300"
          :class="[$route.path === item.href ? 'text-primary-600' : 'text-gray-400']"
        >
          <span class="material-icons text-xl group-hover:scale-110 transition-transform duration-300">
            {{ item.icon }}
          </span>
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <main :class="{
      'pt-20 md:pt-24 pb-24 md:pb-8': !isMobile,
      'pt-4 pb-24': isMobile
    }">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 transform translate-y-4"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 transform translate-y-0"
          leave-to-class="opacity-0 transform translate-y-4"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* Add Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Ensure content doesn't get hidden behind fixed navigation */
body {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Better touch targets for mobile */
@media (max-width: 768px) {
  .material-icons {
    font-size: 24px;
  }
  
  button, a {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
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

/* Gradient background animation */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
