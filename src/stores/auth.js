import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '@/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

  // Computed property для перевірки автентифікації
  const isAuthenticated = computed(() => !!user.value)

  // Слухаємо зміни стану автентифікації
  onAuthStateChanged(auth, (firebaseUser) => {
    console.log('Auth State Changed:', firebaseUser)
    loading.value = false
    
    if (firebaseUser) {
      user.value = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || ''
      }
      if (router.currentRoute.value.path === '/login') {
        router.push('/')
      }
    } else {
      user.value = null
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login')
      }
    }
  })

  // Функція для логіну
  const login = async (email, password) => {
    console.log('Auth Store: Починаємо процес логіну...')
    
    try {
      error.value = null
      loading.value = true
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('Auth Store: Успішний вхід:', userCredential.user.email)
      
      return true
    } catch (err) {
      console.error('Auth Store: Помилка при вході:', err.code, err.message)
      error.value = 'Неправильний email або пароль'
      return false
    } finally {
      loading.value = false
    }
  }

  // Функція для виходу
  const logout = async () => {
    try {
      error.value = null
      await signOut(auth)
    } catch (err) {
      console.error('Auth Store: Помилка при виході:', err)
      error.value = 'Помилка при виході з системи'
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout
  }
}) 