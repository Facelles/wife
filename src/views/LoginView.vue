<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4">
    <div class="w-full max-w-md bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 transform hover:scale-[1.01] transition-all duration-300 animate-fade-in">
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-4 animate-slide-down">
          Кицюня з зайчиком
        </h2>
        <p class="text-lg md:text-xl text-gray-500 animate-slide-down delay-100">
          Увійдіть у ваш акаунт 💕
        </p>
      </div>

      <form class="space-y-8" @submit.prevent="handleLogin">
        <div class="space-y-6">
          <div class="animate-slide-up delay-200">
            <label for="username" class="block text-sm font-light text-gray-700 mb-2">Логін</label>
            <input
              id="username"
              v-model="username"
              name="username"
              type="text"
              required
              class="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              placeholder="Введіть ваш логін"
            />
          </div>

          <div class="animate-slide-up delay-300">
            <label for="password" class="block text-sm font-light text-gray-700 mb-2">Пароль</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              placeholder="Введіть ваш пароль"
            />
          </div>
        </div>

        <div class="animate-slide-up delay-400">
          <button
            type="submit"
            class="w-full flex items-center justify-center px-8 py-4 bg-primary-600 text-white text-lg font-light rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 group"
          >
            <span class="material-icons mr-2 group-hover:rotate-12 transition-transform duration-300">
              login
            </span>
            Увійти
          </button>
        </div>

        <div v-if="error" class="text-center animate-fade-in">
          <p class="text-red-500 text-sm">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  const success = authStore.login(username.value, password.value)
  
  if (success) {
    router.push('/')
  } else {
    error.value = 'Неправильний логін або пароль'
  }
}
</script>

<style scoped>
.delay-100 {
  animation-delay: 100ms;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-300 {
  animation-delay: 300ms;
}

.delay-400 {
  animation-delay: 400ms;
}
</style> 