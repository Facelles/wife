<template>
  <div class="space-y-6">
    <!-- Tasks header -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Розширені завдання</h2>
          <button
            @click="openTaskModal()"
            class="btn btn-primary"
          >
            Нове завдання
          </button>
        </div>

        <!-- Task filters -->
        <div class="mt-4 flex flex-wrap gap-2">
          <button
            v-for="status in taskStatuses"
            :key="status.value"
            @click="currentFilter = status.value"
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              currentFilter === status.value
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ status.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Tasks list -->
    <div class="space-y-4">
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <input
                type="checkbox"
                :checked="task.status === 'completed'"
                @change="toggleTaskStatus(task)"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <div>
                <h3 
                  :class="[
                    'text-lg font-medium',
                    task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                  ]"
                >
                  {{ task.title }}
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ task.description }}
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span 
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  getPriorityClass(task.priority)
                ]"
              >
                {{ task.priority }}
              </span>
              <button
                @click="openTaskModal(task)"
                class="text-gray-400 hover:text-gray-500"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Task metadata -->
          <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div class="flex items-center space-x-4">
              <div>
                <span class="font-medium">Дедлайн:</span>
                {{ task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Не встановлено' }}
              </div>
              <div>
                <span class="font-medium">Категорія:</span>
                {{ task.category }}
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span 
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getStatusClass(task.status)
                ]"
              >
                {{ getStatusLabel(task.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!filteredTasks.length" class="text-center py-12 bg-white rounded-lg">
        <p class="text-gray-500">Немає завдань для відображення</p>
      </div>
    </div>

    <!-- Task modal -->
    <div v-if="showTaskModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full" @click.stop>
        <h3 class="text-lg font-medium mb-4">
          {{ selectedTask ? 'Редагувати завдання' : 'Нове завдання' }}
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Назва</label>
            <input
              v-model="taskForm.title"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Опис</label>
            <textarea
              v-model="taskForm.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Дедлайн</label>
              <input
                v-model="taskForm.dueDate"
                type="date"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Пріоритет</label>
              <select
                v-model="taskForm.priority"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="Низький">Низький</option>
                <option value="Середній">Середній</option>
                <option value="Високий">Високий</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Категорія</label>
            <input
              v-model="taskForm.category"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Наприклад: Робота, Особисте, тощо."
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            v-if="selectedTask"
            @click="deleteTask"
            class="btn btn-danger"
          >
            Видалити
          </button>
          <button
            @click="closeTaskModal"
            class="btn btn-secondary"
          >
            Скасувати
          </button>
          <button
            @click="saveTask"
            class="btn btn-primary"
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData, updateData, deleteData } from '../firebase/database-service'

const authStore = useAuthStore()
const tasks = ref([])
const showTaskModal = ref(false)
const selectedTask = ref(null)
const currentFilter = ref('all')

const taskForm = ref({
  title: '',
  description: '',
  dueDate: '',
  priority: 'Середній',
  category: '',
  status: 'pending'
})

const taskStatuses = [
  { value: 'all', label: 'Всі' },
  { value: 'pending', label: 'В процесі' },
  { value: 'completed', label: 'Завершені' }
]

onMounted(() => {
  loadTasks()
})

const loadTasks = async () => {
  if (!authStore.user) return

  try {
    listenToData('tasks', (data) => {
      if (!data) return
      
      tasks.value = Object.entries(data)
        .map(([id, task]) => ({
          id,
          ...task
        }))
        .filter(task => task.userId === authStore.user.uid)
        .sort((a, b) => b.createdAt - a.createdAt)
    })
  } catch (error) {
    console.error('Помилка при завантаженні завдань:', error)
  }
}

const saveTasks = () => {
  localStorage.setItem(`tasks_${authStore.user?.uid}`, JSON.stringify(tasks.value))
}

const filteredTasks = computed(() => {
  if (currentFilter.value === 'all') {
    return tasks.value
  }
  return tasks.value.filter(task => task.status === currentFilter.value)
})

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'Низький':
      return 'bg-green-100 text-green-800'
    case 'Середній':
      return 'bg-yellow-100 text-yellow-800'
    case 'Високий':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'completed':
      return 'Завершено'
    case 'pending':
      return 'В процесі'
    default:
      return status
  }
}

const toggleTaskStatus = async (task) => {
  if (!authStore.user) return

  try {
    await updateData(`tasks/${task.id}`, {
      status: task.status === 'completed' ? 'pending' : 'completed'
    })
  } catch (error) {
    console.error('Помилка при зміні статусу завдання:', error)
    alert('Помилка при зміні статусу завдання')
  }
}

const openTaskModal = (task = null) => {
  selectedTask.value = task
  if (task) {
    taskForm.value = { ...task }
  } else {
    taskForm.value = {
      title: '',
      description: '',
      dueDate: '',
      priority: 'Середній',
      category: '',
      status: 'pending'
    }
  }
  showTaskModal.value = true
}

const closeTaskModal = () => {
  showTaskModal.value = false
  selectedTask.value = null
}

const saveTask = async () => {
  if (!taskForm.value.title) {
    alert('Будь ласка, введіть назву завдання')
    return
  }

  try {
    const taskData = {
      ...taskForm.value,
      userId: authStore.user.uid,
      userEmail: authStore.user.email,
      createdAt: Date.now()
    }

    if (selectedTask.value) {
      await updateData(`tasks/${selectedTask.value.id}`, taskData)
    } else {
      await pushData('tasks', taskData)
    }

    closeTaskModal()
  } catch (error) {
    console.error('Помилка при збереженні завдання:', error)
    alert('Помилка при збереженні завдання')
  }
}

const deleteTask = async () => {
  if (!selectedTask.value) return
  
  if (confirm('Ви впевнені, що хочете видалити це завдання?')) {
    try {
      await deleteData(`tasks/${selectedTask.value.id}`)
      closeTaskModal()
    } catch (error) {
      console.error('Помилка при видаленні завдання:', error)
      alert('Помилка при видаленні завдання')
    }
  }
}
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
}
</style> 