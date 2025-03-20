<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-100 to-primary-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
      <div>
        <h2 class="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Кицюня з зайчиком
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Увійдіть у ваш акаунт
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md -space-y-px">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Логін</label>
            <input
              id="username"
              v-model="username"
              name="username"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Введіть ваш логін"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Введіть ваш пароль"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <span class="material-icons text-primary-300 group-hover:text-primary-400">
                login
              </span>
            </span>
            Увійти
          </button>
        </div>

        <div v-if="error" class="text-center mt-4">
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