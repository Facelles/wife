<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import { useDevice } from './composables/useDevice'
import { computed, ref, onMounted } from 'vue'
import AppLogo from './components/AppLogo.vue'

const authStore = useAuthStore()
const router = useRouter()
const { isMobile, isDesktop } = useDevice()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const currentUser = computed(() => authStore.user ? authStore.user.name : '')
const mobileMenuOpen = ref(false)

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

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const logout = () => {
  authStore.logout()
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Показуємо лоадер, поки перевіряється стан автентифікації -->
    <div v-if="authStore.loading" class="fixed inset-0 flex items-center justify-center z-50 bg-white">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>

    <!-- Навігація, тільки для авторизованих користувачів -->
    <nav v-else-if="authStore.isAuthenticated" class="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Логотип зліва -->
          <div class="flex-shrink-0">
            <router-link to="/" class="flex items-center h-full py-2">
              <AppLogo size="nav" />
            </router-link>
          </div>
          
          <!-- Навігаційні посилання по центру -->
          <div class="flex-grow flex justify-center">
            <div class="hidden lg:flex items-center space-x-8">
              <router-link to="/" class="nav-link">
                <i class="material-icons">home</i>
                <span>Головна</span>
              </router-link>
              <router-link to="/points" class="nav-link">
                <i class="material-icons">favorite</i>
                <span>Бали</span>
              </router-link>
              <router-link to="/mood" class="nav-link">
                <i class="material-icons">mood</i>
                <span>Настрій</span>
              </router-link>
              <router-link to="/sleep" class="nav-link">
                <i class="material-icons">bedtime</i>
                <span>Сон</span>
              </router-link>
              <router-link to="/tasks" class="nav-link">
                <i class="material-icons">task</i>
                <span>Завдання</span>
              </router-link>
              <router-link to="/chat" class="nav-link">
                <i class="material-icons">chat</i>
                <span>Чат</span>
              </router-link>
              <router-link to="/stats" class="nav-link">
                <i class="material-icons">analytics</i>
                <span>Статистика</span>
              </router-link>
            </div>
            
            <!-- Мобільне меню -->
            <div class="lg:hidden flex items-center">
              <button @click="toggleMobileMenu" class="text-gray-600">
                <i class="material-icons">menu</i>
              </button>
            </div>
          </div>
          
          <!-- Кнопка виходу справа -->
          <div class="flex-shrink-0">
            <button @click="logout" class="nav-link text-red-500">
              <i class="material-icons">logout</i>
              <span>Вийти</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Мобільне навігаційне меню -->
      <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t border-gray-200 py-2">
        <div class="max-w-7xl mx-auto px-4 space-y-1">
          <router-link to="/" class="mobile-nav-link">
            <i class="material-icons">home</i>
            <span>Головна</span>
          </router-link>
          <router-link to="/points" class="mobile-nav-link">
            <i class="material-icons">favorite</i>
            <span>Бали</span>
          </router-link>
          <router-link to="/mood" class="mobile-nav-link">
            <i class="material-icons">mood</i>
            <span>Настрій</span>
          </router-link>
          <router-link to="/sleep" class="mobile-nav-link">
            <i class="material-icons">bedtime</i>
            <span>Сон</span>
          </router-link>
          <router-link to="/tasks" class="mobile-nav-link">
            <i class="material-icons">task</i>
            <span>Завдання</span>
          </router-link>
          <router-link to="/chat" class="mobile-nav-link">
            <i class="material-icons">chat</i>
            <span>Чат</span>
          </router-link>
          <router-link to="/stats" class="mobile-nav-link">
            <i class="material-icons">analytics</i>
            <span>Статистика</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Основний контент -->
    <main :class="{ 'pt-20': authStore.isAuthenticated }" class="max-w-7xl mx-auto px-4">
      <router-view v-if="!authStore.loading" />
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
  @apply flex items-center text-base text-gray-600 hover:text-primary-600 transition-colors duration-200;
}

.nav-link i {
  @apply mr-1;
}

.mobile-nav-link {
  @apply flex items-center py-2 text-base text-gray-600 hover:text-primary-600 transition-colors duration-200;
}

.mobile-nav-link i {
  @apply mr-2;
}

@media (max-width: 1024px) {
  .nav-link span {
    display: none;
  }
  
  .nav-link i {
    @apply text-xl;
  }
}

@media (max-width: 640px) {
  .nav-link {
    @apply text-sm;
  }
}
</style>
