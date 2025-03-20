import { defineStore } from 'pinia'

export const useSleepStore = defineStore('sleep', {
  state: () => ({
    sleepRecords: [],
    sleepGoals: {
      minHours: 7,
      maxHours: 9,
      targetBedtime: '23:00',
      targetWakeup: '07:00'
    }
  }),

  getters: {
    todaySleep: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.sleepRecords.find(record => record.date === today)
    },
    sleepHistory: (state) => state.sleepRecords,
    averageSleepHours: (state) => {
      if (state.sleepRecords.length === 0) return 0
      const totalHours = state.sleepRecords.reduce((sum, record) => sum + record.hours, 0)
      return (totalHours / state.sleepRecords.length).toFixed(1)
    },
    sleepQuality: (state) => {
      if (state.sleepRecords.length === 0) return 0
      const goodSleepDays = state.sleepRecords.filter(
        record => record.hours >= state.sleepGoals.minHours && 
                 record.hours <= state.sleepGoals.maxHours
      ).length
      return Math.round((goodSleepDays / state.sleepRecords.length) * 100)
    }
  },

  actions: {
    addSleepRecord(hours, quality = 5, notes = '') {
      const today = new Date().toISOString().split('T')[0]
      const existingIndex = this.sleepRecords.findIndex(record => record.date === today)
      
      const record = {
        date: today,
        hours,
        quality,
        notes,
        timestamp: new Date().toISOString()
      }

      if (existingIndex !== -1) {
        this.sleepRecords[existingIndex] = record
      } else {
        this.sleepRecords.push(record)
      }
    },

    updateSleepGoals(goals) {
      this.sleepGoals = { ...this.sleepGoals, ...goals }
    },

    getSleepForDate(date) {
      return this.sleepRecords.find(record => record.date === date)
    }
  }
}) 