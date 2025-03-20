<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import { useDevice } from './composables/useDevice'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const { isMobile, isDesktop } = useDevice()
const isAuthenticated = computed(() => authStore.isAuthenticated)

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
  <div class="min-h-screen bg-gray-50">
    <!-- Навігаційне меню - показуємо тільки якщо користувач авторизований -->
    <nav v-if="isAuthenticated" class="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div class="max-w-[1200px] mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <router-link to="/" class="text-2xl text-primary-600 font-light">
            Кицюня з зайчиком
          </router-link>
          
          <div class="flex items-center space-x-8">
            <router-link to="/" class="nav-link">
              <i class="material-icons">home</i>
              Головна
            </router-link>
            <router-link to="/points" class="nav-link">
              <i class="material-icons">favorite</i>
              Бали
            </router-link>
            <router-link to="/settings" class="nav-link">
              <i class="material-icons">settings</i>
              Настрій
            </router-link>
            <router-link to="/sleep" class="nav-link">
              <i class="material-icons">bedtime</i>
              Сон
            </router-link>
            <router-link to="/tasks" class="nav-link">
              <i class="material-icons">task</i>
              Завдання
            </router-link>
            <router-link to="/chat" class="nav-link">
              <i class="material-icons">chat</i>
              Чат
            </router-link>
            <router-link to="/stats" class="nav-link">
              <i class="material-icons">analytics</i>
              Статистика
            </router-link>
            
            <div class="flex items-center space-x-4">
              <span class="text-gray-600">{{ authStore.currentUser?.name }}</span>
              <button @click="handleLogout" class="nav-link text-red-500">
                <i class="material-icons">logout</i>
                Вийти
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Основний контент -->
    <main :class="{ 'pt-16': isAuthenticated }">
      <router-view />
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

.nav-link {
  @apply flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors duration-200;
}

.nav-link i {
  @apply mr-1;
}

@media (max-width: 1024px) {
  .nav-link span {
    display: none;
  }
  
  .space-x-8 {
    @apply space-x-4;
  }
}

@media (max-width: 640px) {
  .nav-link {
    @apply text-sm;
  }
}
</style>
