import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { addDocument, getDocuments, updateDocument, getDocument } from '@/firebase/firestore-service'
import { Timestamp } from 'firebase/firestore'

export const usePointsStore = defineStore('points', () => {
  const authStore = useAuthStore()
  
  const pointsRecords = ref([])
  const userPoints = ref({
    total: 0,
    weekly: 0,
    monthly: 0
  })
  const loading = ref(false)
  const error = ref(null)
  
  // Завантаження даних про бали
  const fetchPointsData = async () => {
    if (!authStore.user) return
    
    try {
      loading.value = true
      error.value = null
      
      // Завантаження записів про бали
      const records = await getDocuments('pointsRecords', [
        { field: 'userId', operator: '==', value: authStore.user.uid }
      ], 'createdAt', 'desc')
      
      pointsRecords.value = records
      
      // Завантаження загальної кількості балів користувача
      const pointsSummaryQuery = await getDocuments('pointsSummary', [
        { field: 'userId', operator: '==', value: authStore.user.uid }
      ])
      
      if (pointsSummaryQuery.length > 0) {
        userPoints.value = pointsSummaryQuery[0]
      } else {
        // Створюємо запис з нульовими балами, якщо його немає
        const defaultPoints = {
          userId: authStore.user.uid,
          total: 0,
          weekly: 0,
          monthly: 0,
          lastReset: Timestamp.now()
        }
        
        const summaryId = await addDocument('pointsSummary', defaultPoints)
        userPoints.value = {
          id: summaryId,
          ...defaultPoints
        }
      }
      
      // Перевіряємо необхідність скидання тижневих і місячних балів
      await checkPointsReset()
      
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  // Перевірка необхідності скидання балів
  const checkPointsReset = async () => {
    if (!userPoints.value || !userPoints.value.lastReset) return
    
    const now = new Date()
    const lastReset = userPoints.value.lastReset.toDate()
    
    // Скидання тижневих балів (якщо минув тиждень)
    const weekAgo = new Date(now)
    weekAgo.setDate(weekAgo.getDate() - 7)
    
    // Скидання місячних балів (якщо минув місяць)
    const monthAgo = new Date(now)
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    
    let needsUpdate = false
    const updates = {}
    
    if (lastReset < weekAgo) {
      updates.weekly = 0
      needsUpdate = true
    }
    
    if (lastReset < monthAgo) {
      updates.monthly = 0
      needsUpdate = true
    }
    
    if (needsUpdate) {
      updates.lastReset = Timestamp.now()
      
      await updateDocument('pointsSummary', userPoints.value.id, updates)
      
      userPoints.value = {
        ...userPoints.value,
        ...updates
      }
    }
  }
  
  // Додавання балів
  const addPoints = async (points, reason) => {
    if (!authStore.user || !userPoints.value) return
    
    try {
      loading.value = true
      error.value = null
      
      // Створюємо новий запис про бали
      const newRecord = {
        userId: authStore.user.uid,
        points: points,
        reason: reason || 'Завдання виконано',
        createdAt: Timestamp.now()
      }
      
      const recordId = await addDocument('pointsRecords', newRecord)
      
      // Оновлюємо загальну кількість балів
      await updateDocument('pointsSummary', userPoints.value.id, {
        total: userPoints.value.total + points,
        weekly: userPoints.value.weekly + points,
        monthly: userPoints.value.monthly + points
      })
      
      // Оновлюємо локальний стан
      pointsRecords.value.unshift({
        id: recordId,
        ...newRecord
      })
      
      userPoints.value = {
        ...userPoints.value,
        total: userPoints.value.total + points,
        weekly: userPoints.value.weekly + points,
        monthly: userPoints.value.monthly + points
      }
      
      return recordId
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }
  
  // Обчислені властивості
  
  // Записи про бали за останній тиждень
  const lastWeekPointsRecords = computed(() => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    return pointsRecords.value
      .filter(record => record.createdAt.toDate() >= sevenDaysAgo)
      .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
  })
  
  // Сума балів за останній тиждень
  const lastWeekPointsTotal = computed(() => {
    return lastWeekPointsRecords.value.reduce((sum, record) => sum + record.points, 0)
  })
  
  // Записи про бали за останній місяць
  const lastMonthPointsRecords = computed(() => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    return pointsRecords.value
      .filter(record => record.createdAt.toDate() >= thirtyDaysAgo)
      .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
  })
  
  // Сума балів за останній місяць
  const lastMonthPointsTotal = computed(() => {
    return lastMonthPointsRecords.value.reduce((sum, record) => sum + record.points, 0)
  })
  
  return {
    pointsRecords,
    userPoints,
    loading,
    error,
    lastWeekPointsRecords,
    lastWeekPointsTotal,
    lastMonthPointsRecords,
    lastMonthPointsTotal,
    fetchPointsData,
    addPoints
  }
}) 