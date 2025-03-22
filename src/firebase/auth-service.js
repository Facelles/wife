import { 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth'
import { auth } from './index'

// Логін користувача
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

// Вихід користувача
export const logoutUser = async () => {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
}

// Створення нового користувача
export const createUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })
    return userCredential.user
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Оновлення профілю користувача
export const updateUserProfile = async (userData) => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: userData.displayName,
        photoURL: userData.photoURL
      })
      return true
    }
    return false
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
} 