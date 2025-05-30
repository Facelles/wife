import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatsStore = defineStore('stats', () => {
  const moodStats = ref({
    user: [],
    partner: []
  })

  const taskStats = ref({
    completed: 0,
    total: 0,
    rate: 0
  })

  const pointsStats = ref({
    total: 0,
    recent: []
  })

  const setMoodStats = (stats) => {
    moodStats.value = stats
  }

  const setTaskStats = (stats) => {
    taskStats.value = stats
  }

  const setPointsStats = (stats) => {
    pointsStats.value = stats
  }

  return {
    moodStats,
    taskStats,
    pointsStats,
    setMoodStats,
    setTaskStats,
    setPointsStats
  }
}) 