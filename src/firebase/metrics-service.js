import { db } from './index'
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'

// Додавання нової метрики
export const addMetric = async (userId, type, value) => {
  try {
    await addDoc(collection(db, 'metrics'), {
      userId,
      type, // 'mood', 'sleep', 'energy', 'stress'
      value,
      createdAt: serverTimestamp()
    })
    return true
  } catch (error) {
    console.error('Помилка при додаванні метрики:', error)
    return false
  }
}

// Отримання метрик за типом
export const getMetricsByType = async (userId, type) => {
  try {
    const q = query(
      collection(db, 'metrics'),
      where('userId', '==', userId),
      where('type', '==', type)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Помилка при отриманні метрик:', error)
    return []
  }
} 