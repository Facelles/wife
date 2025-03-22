import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { addDocument, getDocuments, updateDocument, deleteDocument } from '@/firebase/firestore-service'
import { Timestamp } from 'firebase/firestore'

export const useSleepStore = defineStore('sleep', () => {
  const authStore = useAuthStore()
  
  const sleepRecords = ref([])
  const sleepGoals = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // Завантаження даних про сон
  const fetchSleepData = async () => {
    if (!authStore.user) return
    
    try {
      loading.value = true
      error.value = null
      
      // Завантаження записів про сон
      const records = await getDocuments('sleepRecords', [
        { field: 'userId', operator: '==', value: authStore.user.uid }
      ], 'date', 'desc')
      sleepRecords.value = records
      
      // Завантаження цілей сну
      const goalsQuery = await getDocuments('sleepGoals', [
        { field: 'userId', operator: '==', value: authStore.user.uid }
      ], 'updatedAt', 'desc', 1)
      
      if (goalsQuery.length > 0) {
        sleepGoals.value = goalsQuery[0]
      } else {
        // Встановлюємо стандартні цілі
        const defaultGoals = {
          userId: authStore.user.uid,
          minHours: 7,
          maxHours: 9,
          targetBedtime: '23:00',
          targetWakeup: '07:00'
        }
        
        const goalId = await addDocument('sleepGoals', defaultGoals)
        sleepGoals.value = {
          id: goalId,
          ...defaultGoals,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        }
      }
      
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  // Додавання запису про сон
  const addSleepRecord = async (record) => {
    if (!authStore.user) return
    
    try {
      loading.value = true
      error.value = null
      
      const newRecord = {
        date: record.date,
        hours: record.hours,
        quality: record.quality,
        notes: record.notes || '',
        userId: authStore.user.uid
      }
      
      const recordId = await addDocument('sleepRecords', newRecord)
      
      // Додаємо в локальний стан
      sleepRecords.value.unshift({
        id: recordId,
        ...newRecord,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
      
      return recordId
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }
  
  // Оновлення цілей сну
  const updateSleepGoals = async (goals) => {
    if (!authStore.user || !sleepGoals.value) return
    
    try {
      loading.value = true
      error.value = null
      
      const updates = {
        minHours: goals.minHours,
        maxHours: goals.maxHours,
        targetBedtime: goals.targetBedtime,
        targetWakeup: goals.targetWakeup
      }
      
      // Оновлюємо цілі в Firebase
      await updateDocument('sleepGoals', sleepGoals.value.id, updates)
      
      // Оновлюємо локальний стан
      sleepGoals.value = {
        ...sleepGoals.value,
        ...updates,
        updatedAt: Timestamp.now()
      }
      
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }
  
  // Видалення запису про сон
  const deleteSleepRecord = async (recordId) => {
    if (!authStore.user) return
    
    try {
      loading.value = true
      error.value = null
      
      // Видаляємо запис в Firebase
      await deleteDocument('sleepRecords', recordId)
      
      // Оновлюємо локальний стан
      sleepRecords.value = sleepRecords.value.filter(r => r.id !== recordId)
      
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }
  
  // Обчислені властивості
  
  // Середня кількість годин сну
  const averageSleepHours = computed(() => {
    if (sleepRecords.value.length === 0) return 0
    
    const totalHours = sleepRecords.value.reduce((sum, record) => sum + record.hours, 0)
    return Math.round((totalHours / sleepRecords.value.length) * 10) / 10
  })
  
  // Середня якість сну
  const averageSleepQuality = computed(() => {
    if (sleepRecords.value.length === 0) return 0
    
    const totalQuality = sleepRecords.value.reduce((sum, record) => sum + record.quality, 0)
    return Math.round((totalQuality / sleepRecords.value.length) * 10) / 10
  })
  
  // Запис сну на сьогодні
  const todaySleepRecord = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return sleepRecords.value.find(record => record.date === today) || null
  })
  
  // Записи сну за останні 7 днів
  const lastWeekSleepRecords = computed(() => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    return sleepRecords.value
      .filter(record => new Date(record.date) >= sevenDaysAgo)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  })
  
  return {
    sleepRecords,
    sleepGoals,
    loading,
    error,
    averageSleepHours,
    averageSleepQuality,
    todaySleepRecord,
    lastWeekSleepRecords,
    fetchSleepData,
    addSleepRecord,
    updateSleepGoals,
    deleteSleepRecord
  }
}) 