import { ref, onValue, set, update, remove, push, child } from 'firebase/database'
import { rtdb } from './index'

// Отримання даних у реальному часі
export const listenToData = (path, callback) => {
  const dataRef = ref(rtdb, path)
  const unsubscribe = onValue(dataRef, (snapshot) => {
    const data = snapshot.val()
    callback(data)
  })
  
  return unsubscribe
}

// Запис даних
export const writeData = async (path, data) => {
  try {
    await set(ref(rtdb, path), data)
    return true
  } catch (error) {
    console.error('Error writing data:', error)
    throw error
  }
}

// Оновлення даних
export const updateData = async (path, data) => {
  try {
    await update(ref(rtdb, path), data)
    return true
  } catch (error) {
    console.error('Error updating data:', error)
    throw error
  }
}

// Видалення даних
export const removeData = async (path) => {
  try {
    await remove(ref(rtdb, path))
    return true
  } catch (error) {
    console.error('Error removing data:', error)
    throw error
  }
}

// Додавання даних з автоматичним ID
export const pushData = async (path, data) => {
  try {
    const newRef = push(ref(rtdb, path))
    await set(newRef, data)
    return newRef.key
  } catch (error) {
    console.error('Error pushing data:', error)
    throw error
  }
} 