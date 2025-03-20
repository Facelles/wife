import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    completedTasks: [],
    categories: [
      { id: 'health', name: 'Health', color: 'bg-green-100 text-green-800' },
      { id: 'romance', name: 'Romance', color: 'bg-red-100 text-red-800' },
      { id: 'learning', name: 'Learning', color: 'bg-blue-100 text-blue-800' },
      { id: 'fitness', name: 'Fitness', color: 'bg-purple-100 text-purple-800' },
      { id: 'other', name: 'Other', color: 'bg-gray-100 text-gray-800' }
    ]
  }),

  getters: {
    activeTasks: (state) => state.tasks,
    completedTasksList: (state) => state.completedTasks,
    tasksByCategory: (state) => {
      const grouped = {}
      state.categories.forEach(category => {
        grouped[category.id] = state.tasks.filter(task => task.category === category.id)
      })
      return grouped
    }
  },

  actions: {
    addTask(task) {
      this.tasks.push({
        id: Date.now(),
        ...task,
        completed: false,
        createdAt: new Date().toISOString()
      })
    },

    completeTask(taskId) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        const task = this.tasks[taskIndex]
        this.completedTasks.push({
          ...task,
          completed: true,
          completedAt: new Date().toISOString()
        })
        this.tasks.splice(taskIndex, 1)
      }
    },

    deleteTask(taskId) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1)
      }
    },

    updateTask(taskId, updates) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates }
      }
    }
  }
}) 