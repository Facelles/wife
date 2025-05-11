<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import { useDevice } from './composables/useDevice'
import { computed, ref, onMounted, watch } from 'vue'
import AppLogo from './components/AppLogo.vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const { isMobile, isDesktop } = useDevice()
const route = useRoute()

// Використовуємо storeToRefs для реактивних властивостей
const { user, isAuthenticated, loading } = storeToRefs(authStore)

const currentUser = computed(() => user.value ? user.value.name : '')
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

// Показувати навігацію тільки якщо користувач авторизований і це не сторінка логіну
const showNavigation = computed(() => {
  console.log('App: Перевірка навігації:', {
    isAuthenticated: isAuthenticated.value,
    currentPath: route.path,
    user: user.value
  })
  return isAuthenticated.value && route.path !== '/login'
})

// Спостерігаємо за змінами стану автентифікації
watch(isAuthenticated, (newValue) => {
  console.log('App: Зміна стану автентифікації:', newValue)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Показуємо лоадер, поки перевіряється стан автентифікації -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50 bg-white">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>

    <!-- Навігація, тільки для авторизованих користувачів -->
    <nav v-if="showNavigation" class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <router-link to="/" class="flex items-center">
              <AppLogo class="h-8 w-auto" />
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-8">
            <router-link 
              v-for="item in navigation" 
              :key="item.href"
              :to="item.href" 
              class="nav-link"
              :class="{ 'text-primary-600': route.path === item.href }"
            >
              <i class="material-icons">{{ item.icon }}</i>
              <span>{{ item.name }}</span>
            </router-link>
          </div>

          <!-- Mobile menu button -->
          <div class="lg:hidden flex items-center">
            <button 
              @click="toggleMobileMenu" 
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <i class="material-icons">{{ mobileMenuOpen ? 'close' : 'menu' }}</i>
            </button>
          </div>

          <!-- User menu -->
          <div class="hidden lg:flex items-center">
            <span class="text-gray-700 mr-4">{{ currentUser }}</span>
            <button 
              @click="handleLogout" 
              class="text-gray-400 hover:text-gray-500"
            >
              <i class="material-icons">logout</i>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div 
        v-if="mobileMenuOpen" 
        class="lg:hidden bg-white border-t border-gray-200"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link 
            v-for="item in navigation" 
            :key="item.href"
            :to="item.href" 
            class="mobile-nav-link"
            :class="{ 'bg-primary-50 text-primary-600': route.path === item.href }"
            @click="mobileMenuOpen = false"
          >
            <i class="material-icons">{{ item.icon }}</i>
            <span>{{ item.name }}</span>
          </router-link>
          
          <div class="pt-4 pb-3 border-t border-gray-200">
            <div class="flex items-center px-4">
              <div class="flex-shrink-0">
                <i class="material-icons text-gray-400">account_circle</i>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">{{ currentUser }}</div>
              </div>
            </div>
            <div class="mt-3 px-2">
              <button 
                @click="handleLogout" 
                class="w-full flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md"
              >
                <i class="material-icons mr-3">logout</i>
                Вийти
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Основний контент -->
    <main :class="{ 'pt-16': showNavigation }" class="max-w-7xl mx-auto px-4 py-6">
      <router-view v-if="!loading" />
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
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
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
  @apply mr-2;
}

.mobile-nav-link {
  @apply flex items-center px-4 py-3 text-base text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200 rounded-md;
}

.mobile-nav-link i {
  @apply mr-3;
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
