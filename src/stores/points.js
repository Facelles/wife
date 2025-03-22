import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { useAuthStore } from './auth'
import { listenToData, pushData } from '../firebase/database-service'

export const usePointsStore = defineStore('points', () => {
  const authStore = useAuthStore()
  const points = ref(0)
  const history = ref([])

  // Завантаження балів
  const loadPoints = async () => {
    if (!authStore.user) return

    try {
      // Слухаємо зміни балів
      listenToData(`points/${authStore.user.uid}`, (data) => {
        if (data) {
          points.value = data.current || 0
          history.value = data.history || []
        }
      })
    } catch (error) {
      console.error('Помилка при завантаженні балів:', error)
    }
  }

  // Додавання балів
  const addPoints = async (amount, reason) => {
    if (!authStore.user) return

    try {
      const newPoints = points.value + amount
      const historyEntry = {
        amount,
        reason,
        timestamp: Date.now()
      }

      await pushData(`points/${authStore.user.uid}/history`, historyEntry)
      await pushData(`points/${authStore.user.uid}`, {
        current: newPoints,
        updatedAt: Date.now()
      })

      points.value = newPoints
      history.value.push(historyEntry)
    } catch (error) {
      console.error('Помилка при додаванні балів:', error)
    }
  }

  // Віднімання балів
  const subtractPoints = async (amount, reason) => {
    if (!authStore.user || points.value < amount) return

    try {
      const newPoints = points.value - amount
      const historyEntry = {
        amount: -amount,
        reason,
        timestamp: Date.now()
      }

      await pushData(`points/${authStore.user.uid}/history`, historyEntry)
      await pushData(`points/${authStore.user.uid}`, {
        current: newPoints,
        updatedAt: Date.now()
      })

      points.value = newPoints
      history.value.push(historyEntry)
    } catch (error) {
      console.error('Помилка при відніманні балів:', error)
    }
  }

  onMounted(() => {
    loadPoints()
  })

  return {
    points,
    history,
    addPoints,
    subtractPoints
  }
}) 