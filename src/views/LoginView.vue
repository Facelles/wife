<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100">
    <div class="w-[400px] bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-all duration-300 animate-fade-in">
      <div class="text-center mb-8">
        <AppLogo class="xl" />
        <p class="text-xl text-gray-500 animate-slide-down delay-100 mt-4">
          Увійдіть у ваш акаунт 💕
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div class="animate-slide-up delay-200">
            <label for="username" class="block text-base font-light text-gray-700 mb-2">Логін</label>
            <input
              id="username"
              v-model="username"
              name="username"
              type="text"
              required
              class="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              placeholder="Введіть ваш логін"
            />
          </div>

          <div class="animate-slide-up delay-300">
            <label for="password" class="block text-base font-light text-gray-700 mb-2">Пароль</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              placeholder="Введіть ваш пароль"
            />
          </div>
        </div>

        <div class="animate-slide-up delay-400 pt-2">
          <button
            type="submit"
            class="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white text-base font-light rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 group"
          >
            <span class="material-icons mr-2 group-hover:rotate-12 transition-transform duration-300">
              login
            </span>
            Увійти
          </button>
        </div>

        <div v-if="error" class="text-center animate-fade-in">
          <p class="text-red-500 text-base">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppLogo from '@/components/AppLogo.vue'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  try {
    const success = await authStore.login(username.value, password.value)

    if (success) {
      router.push('/')
    } else {
      error.value = 'Неправильний логін або пароль'
    }
  } catch (err) {
    error.value = 'Сталася помилка, спробуйте ще раз.'
  }
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  width: 100%;
}

@media (max-width: 480px) {
  .w-\[400px\] {
    width: 90%;
    max-width: 400px;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
  }
  
  .text-xl {
    font-size: 1rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
}
</style> 