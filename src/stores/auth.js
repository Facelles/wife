import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '@/firebase'
import { loginUser, logoutUser, updateUserProfile } from '@/firebase/auth-service'
import { onAuthStateChanged } from 'firebase/auth'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

  // Встановлюємо слухача для зміни стану автентифікації
  onAuthStateChanged(auth, (firebaseUser) => {
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

  return {
    user,
    loading,
    error,
  }
}) 