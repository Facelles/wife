import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '@/firebase'
import { loginUser, logoutUser, updateUserProfile } from '@/firebase/auth-service'
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
    } else {
      user.value = null
    }
  })

  // Функція для логіну
  const login = async (email, password) => {
    console.log('Auth Store: Починаємо процес логіну...')
    
    try {
      error.value = null
      loading.value = true
      console.log('Auth Store: Викликаємо signInWithEmailAndPassword...')
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('Auth Store: Успішний вхід:', userCredential.user.email)
      
      user.value = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || '',
        photoURL: userCredential.user.photoURL || ''
      }
      return true
    } catch (err) {
      console.error('Auth Store: Помилка при вході:', err.code, err.message)
      error.value = err.message
      return false
    } finally {
      loading.value = false
      console.log('Auth Store: Процес логіну завершено. User:', user.value)
      console.log('Auth Store: isAuthenticated:', isAuthenticated.value)
    }
  }

  // Функція для виходу
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      router.push('/login')
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