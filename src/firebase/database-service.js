import { ref, onValue, set, update, remove, push, child, get } from 'firebase/database'
import { database } from './index'

// Отримання даних у реальному часі
export const listenToData = (path, callback) => {
  const dataRef = ref(database, path)
  const unsubscribe = onValue(dataRef, (snapshot) => {
    const data = snapshot.val()
    callback(data)
  })
  
  return unsubscribe
}

// Отримання даних один раз
export const getData = async (path) => {
  try {
    const snapshot = await get(ref(database, path))
    return snapshot.val()
  } catch (error) {
    console.error('Error getting data:', error)
    throw error
  }
}

// Запис даних
export const writeData = async (path, data) => {
  try {
    await set(ref(database, path), {
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
    await update(ref(database, path), {
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
    await remove(ref(database, path))
    return true
  } catch (error) {
    console.error('Error removing data:', error)
    throw error
  }
}

// Додавання даних з автоматичним ID
export const pushData = async (path, data) => {
  try {
    console.log('Pushing data to path:', path, 'with data:', data)
    const newRef = push(ref(database, path))
    const dataToSave = {
      ...data,
      id: newRef.key,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    console.log('Saving data:', dataToSave)
    await set(newRef, dataToSave)
    console.log('Data saved successfully')
    return newRef.key
  } catch (error) {
    console.error('Error pushing data:', error)
    throw error
  }
}

// Отримання даних користувача
export const getUserData = async (userId) => {
  try {
    const snapshot = await get(ref(database, `users/${userId}`))
    return snapshot.val()
  } catch (error) {
    console.error('Error getting user data:', error)
    throw error
  }
}

// Оновлення даних користувача
export const updateUserData = async (userId, data) => {
  try {
    await update(ref(database, `users/${userId}`), {
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
    const messagesRef = ref(database, 'messages')
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
    const newMessageRef = push(ref(database, 'messages'))
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

// Функція для видалення даних
export const deleteData = async (path) => {
  const dataRef = ref(database, path)
  await remove(dataRef)
} 