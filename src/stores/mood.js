import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { addDocument, getDocuments, updateDocument, deleteDocument } from '@/firebase/firestore-service'
import { Timestamp } from 'firebase/firestore'

export const useMoodStore = defineStore('mood', () => {
  const authStore = useAuthStore()
  
  const moodRecords = ref([])
  const moodOptions = [
    { id: 'happy', emoji: '😊', label: 'Happy' },
    { id: 'excited', emoji: '😍', label: 'Love' },
    { id: 'calm', emoji: '😌', label: 'Calm' },
    { id: 'tired', emoji: '🥲', label: 'Tired' },
    { id: 'stressed', emoji: '😰', label: 'Stressed' },
    { id: 'angry', emoji: '💋', label: 'Kiss' },
    { id: 'sad', emoji: '😢', label: 'Sad' }
  ]

  const getters = {
    todayMood: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.moodRecords.find(mood => mood.date === today)
    },
    moodHistory: (state) => state.moodRecords,
    moodStats: (state) => {
      const stats = {}
      state.moodRecords.forEach(mood => {
        stats[mood.moodId] = (stats[mood.moodId] || 0) + 1
      })
      return stats
    }
  }

  const actions = {
    addMood(moodId, note = '') {
      const today = new Date().toISOString().split('T')[0]
      const existingIndex = this.moodRecords.findIndex(mood => mood.date === today)
      
      if (existingIndex !== -1) {
        this.moodRecords[existingIndex] = { date: today, moodId, note }
      } else {
        this.moodRecords.push({ date: today, moodId, note })
      }
    },

    getMoodForDate(date) {
      return this.moodRecords.find(mood => mood.date === date)
    }
  }

  return {
    moodRecords,
    moodOptions,
    ...getters,
    ...actions
  }
}) 