<template>
  <div class="space-y-6">
    <!-- Overview stats -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Total Points</dt>
            <dd class="mt-1 text-3xl font-semibold text-primary-600">{{ points.totalPoints }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Average Sleep</dt>
            <dd class="mt-1 text-3xl font-semibold text-primary-600">{{ sleep.averageSleepHours }}h</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Completed Tasks</dt>
            <dd class="mt-1 text-3xl font-semibold text-primary-600">{{ tasks.completedTasksList.length }}</dd>
          </div>
        </div>
      </div>
    </div>

    <!-- Mood chart -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Mood Trends</h3>
        <div class="h-64">
          <Line
            :data="moodChartData"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>

    <!-- Sleep chart -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Sleep Patterns</h3>
        <div class="h-64">
          <Bar
            :data="sleepChartData"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>

    <!-- Points chart -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Points History</h3>
        <div class="h-64">
          <Line
            :data="pointsChartData"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>

    <!-- Task completion by category -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Tasks by Category</h3>
        <div class="h-64">
          <Doughnut
            :data="tasksChartData"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line, Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { usePointsStore } from '../stores/points'
import { useMoodStore } from '../stores/mood'
import { useSleepStore } from '../stores/sleep'
import { useTasksStore } from '../stores/tasks'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const points = usePointsStore()
const mood = useMoodStore()
const sleep = useSleepStore()
const tasks = useTasksStore()

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

// Mood chart data
const moodChartData = computed(() => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()

  return {
    labels: last7Days.map(date => new Date(date).toLocaleDateString()),
    datasets: [{
      label: 'Mood Score',
      data: last7Days.map(date => {
        const moodEntry = mood.getMoodForDate(date)
        return moodEntry ? mood.moodOptions.findIndex(m => m.id === moodEntry.moodId) + 1 : null
      }),
      borderColor: '#0ea5e9',
      tension: 0.4
    }]
  }
})

// Sleep chart data
const sleepChartData = computed(() => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()

  return {
    labels: last7Days.map(date => new Date(date).toLocaleDateString()),
    datasets: [{
      label: 'Hours of Sleep',
      data: last7Days.map(date => {
        const sleepEntry = sleep.getSleepForDate(date)
        return sleepEntry ? sleepEntry.hours : 0
      }),
      backgroundColor: '#0ea5e9'
    }]
  }
})

// Points chart data
const pointsChartData = computed(() => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()

  return {
    labels: last7Days.map(date => new Date(date).toLocaleDateString()),
    datasets: [{
      label: 'Points Earned',
      data: last7Days.map(date => {
        const pointsForDay = points.pointsHistory.filter(
          entry => entry.timestamp.startsWith(date)
        ).reduce((sum, entry) => sum + entry.amount, 0)
        return pointsForDay
      }),
      borderColor: '#0ea5e9',
      tension: 0.4
    }]
  }
})

// Tasks chart data
const tasksChartData = computed(() => {
  const categoryCounts = {}
  tasks.completedTasksList.forEach(task => {
    categoryCounts[task.category] = (categoryCounts[task.category] || 0) + 1
  })

  return {
    labels: tasks.categories.map(cat => cat.name),
    datasets: [{
      data: tasks.categories.map(cat => categoryCounts[cat.id] || 0),
      backgroundColor: tasks.categories.map(cat => {
        const color = cat.color.split(' ')[0]
        return color.replace('bg-', '#')
      })
    }]
  }
})
</script> 