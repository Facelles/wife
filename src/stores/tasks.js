import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { addDocument, getDocuments, updateDocument, deleteDocument } from '@/firebase/firestore-service'
import { Timestamp } from 'firebase/firestore'

export const useTasksStore = defineStore('tasks', () => {
  const authStore = useAuthStore()
  
  const tasks = ref([])
  const completedTasks = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  // Категорії завдань
  const categories = ref(['health', 'romance', 'learning', 'fitness', 'other'])
  
  // Активні завдання
  const activeTasks = computed(() => tasks.value)
  
  // Завдання по категоріям
  const tasksByCategory = computed(() => {
    const result = {}
    categories.value.forEach(category => {
      result[category] = tasks.value.filter(task => task.category === category)
    })
    return result
  })
  
  // Завантаження завдань користувача
  const fetchTasks = async () => {
    if (!authStore.user) return
    
    try {
      loading.value = true
      error.value = null
      
      // Завантажуємо активні завдання
      const activeTasks = await getDocuments('tasks', [
        { field: 'userId', operator: '==', value: authStore.user.uid },
        { field: 'completed', operator: '==', value: false }
      ])
      tasks.value = activeTasks
      
      // Завантажуємо завершені завдання
      const finishedTasks = await getDocuments('tasks', [
        { field: 'userId', operator: '==', value: authStore.user.uid },
        { field: 'completed', operator: '==', value: true }
      ])
      completedTasks.value = finishedTasks
      
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  // Додавання нового завдання
  const addTask = async (task) => {
    if (!authStore.user) return
    
    try {
      loading.value = true
      error.value = null
      
      const newTask = {
        title: task.title,
        description: task.description,
        category: task.category,
        points: task.points || 1,
        completed: false,
        userId: authStore.user.uid,
        partnerView: task.partnerView || false
      }
      
      const taskId = await addDocument('tasks', newTask)
      
      // Додаємо в локальний стан
      tasks.value.push({
        id: taskId,
        ...newTask,
        createdAt: new Date().toISOString()
      })
      
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const completeTask = (taskId) => {
    const taskIndex = tasks.value.findIndex(task => task.id === taskId)
    if (taskIndex !== -1) {
      const task = tasks.value[taskIndex]
      completedTasks.value.push({
        ...task,
        completed: true,
        completedAt: new Date().toISOString()
      })
      tasks.value.splice(taskIndex, 1)
    }
  }

  const deleteTask = (taskId) => {
    const taskIndex = tasks.value.findIndex(task => task.id === taskId)
    if (taskIndex !== -1) {
      tasks.value.splice(taskIndex, 1)
    }
  }

  const updateTask = (taskId, updates) => {
    const taskIndex = tasks.value.findIndex(task => task.id === taskId)
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = { ...tasks.value[taskIndex], ...updates }
    }
  }

  return {
    tasks,
    completedTasks,
    categories,
    activeTasks,
    tasksByCategory,
    loading,
    error,
    fetchTasks,
    addTask,
    completeTask,
    deleteTask,
    updateTask
  }
}) 