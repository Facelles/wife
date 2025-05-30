import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth, database } from '@/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { ref as dbRef, set } from 'firebase/database'
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
      
      // Зберігаємо інформацію про користувача у вузол /users
      const userRef = dbRef(database, 'users/' + firebaseUser.uid);
      set(userRef, {
        email: firebaseUser.email,
        // Можливо, інші дані, які ви хочете зберігати в users
        name: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || ''
      })
      .then(() => {
        console.log("Auth Store: User data saved to /users node");
      })
      .catch((error) => {
        console.error("Auth Store: Error saving user data:", error);
      });

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
    console.log('Auth Store: Починаємо процес виходу...')
    try {
      error.value = null
      loading.value = true
      await signOut(auth)
      console.log('Auth Store: Успішний вихід')
      return true
    } catch (err) {
      console.error('Auth Store: Помилка при виході:', err.code, err.message)
      error.value = 'Помилка при виході'
      return false
    } finally {
      loading.value = false
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