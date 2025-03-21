import { ref, onValue, set, update, remove, push, child, get } from 'firebase/database'
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

// Отримання даних один раз
export const getData = async (path) => {
  try {
    const snapshot = await get(ref(rtdb, path))
    return snapshot.val()
  } catch (error) {
    console.error('Error getting data:', error)
    throw error
  }
}

// Запис даних
export const writeData = async (path, data) => {
  try {
    await set(ref(rtdb, path), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return true
  } catch (error) {
    console.error('Error writing data:', error)
    throw error
  }
}

// Оновлення даних
export const updateData = async (path, data) => {
  try {
    await update(ref(rtdb, path), {
      ...data,
      updatedAt: new Date().toISOString()
    })
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
    await set(newRef, {
      ...data,
      id: newRef.key,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return newRef.key
  } catch (error) {
    console.error('Error pushing data:', error)
    throw error
  }
}

// Отримання даних користувача
export const getUserData = async (userId) => {
  try {
    const snapshot = await get(ref(rtdb, `users/${userId}`))
    return snapshot.val()
  } catch (error) {
    console.error('Error getting user data:', error)
    throw error
  }
}

// Оновлення даних користувача
export const updateUserData = async (userId, data) => {
  try {
    await update(ref(rtdb, `users/${userId}`), {
      ...data,
      updatedAt: new Date().toISOString()
    })
    return true
  } catch (error) {
    console.error('Error updating user data:', error)
    throw error
  }
}

// Отримання повідомлень
export const getMessages = async (limit = 50) => {
  try {
    const messagesRef = ref(rtdb, 'messages')
    const snapshot = await get(messagesRef)
    const messages = []
    
    snapshot.forEach((childSnapshot) => {
      messages.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      })
    })
    
    return messages.slice(-limit)
  } catch (error) {
    console.error('Error getting messages:', error)
    throw error
  }
}

// Відправка повідомлення
export const sendMessage = async (userId, content) => {
  try {
    const newMessageRef = push(ref(rtdb, 'messages'))
    await set(newMessageRef, {
      userId,
      content,
      createdAt: new Date().toISOString(),
      id: newMessageRef.key
    })
    return newMessageRef.key
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
} 