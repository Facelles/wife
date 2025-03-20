<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

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
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
    <nav v-if="authStore.isAuthenticated" class="bg-white/80 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-xl font-bold text-primary-600">Кицюня з зайчиком</h1>
            </div>
            <!-- Desktop Navigation -->
            <div class="hidden md:ml-6 md:flex md:space-x-4">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  $route.path === item.href
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600',
                  'px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200'
                ]"
              >
                <span class="material-icons mr-2 text-lg">{{ item.icon }}</span>
                {{ item.name }}
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700 hidden sm:inline">{{ authStore.currentUser?.name }}</span>
            <button
              @click="handleLogout"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <span class="material-icons mr-1">logout</span>
              Вийти
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation -->
    <div v-if="authStore.isAuthenticated" class="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-lg z-50">
      <div class="flex justify-around items-center h-16 max-w-5xl mx-auto">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[
            $route.path === item.href
              ? 'text-primary-600'
              : 'text-gray-500 hover:text-primary-500',
            'flex flex-col items-center text-xs py-1 px-3 rounded-lg transition-colors duration-200'
          ]"
        >
          <span class="material-icons text-xl mb-1">{{ item.icon }}</span>
          <span>{{ item.name }}</span>
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <main class="pt-16 pb-16 md:pb-0 min-h-screen">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="bg-white/80 backdrop-blur-sm shadow-sm rounded-xl p-6">
          <router-view></router-view>
        </div>
      </div>
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
