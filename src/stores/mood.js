import { defineStore } from 'pinia'

export const useMoodStore = defineStore('mood', {
  state: () => ({
    moods: [],
    moodOptions: [
      { id: 'happy', emoji: '😊', label: 'Happy' },
      { id: 'excited', emoji: '🤗', label: 'Excited' },
      { id: 'calm', emoji: '😌', label: 'Calm' },
      { id: 'tired', emoji: '😴', label: 'Tired' },
      { id: 'stressed', emoji: '😰', label: 'Stressed' },
      { id: 'angry', emoji: '😠', label: 'Angry' },
      { id: 'sad', emoji: '😢', label: 'Sad' }
    ]
  }),

  getters: {
    todayMood: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.moods.find(mood => mood.date === today)
    },
    moodHistory: (state) => state.moods,
    moodStats: (state) => {
      const stats = {}
      state.moods.forEach(mood => {
        stats[mood.moodId] = (stats[mood.moodId] || 0) + 1
      })
      return stats
    }
  },

  actions: {
    addMood(moodId, note = '') {
      const today = new Date().toISOString().split('T')[0]
      const existingIndex = this.moods.findIndex(mood => mood.date === today)
      
      if (existingIndex !== -1) {
        this.moods[existingIndex] = { date: today, moodId, note }
      } else {
        this.moods.push({ date: today, moodId, note })
      }
    },

    getMoodForDate(date) {
      return this.moods.find(mood => mood.date === date)
    }
  }
}) 