<template>
  <div class="space-y-6">
    <!-- Add new task -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Task</h3>
        <form @submit.prevent="handleAddTask" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              v-model="newTask.title"
              class="input mt-1"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="newTask.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <select
              v-model="newTask.category"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option v-for="category in tasks.categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Points</label>
            <input
              type="number"
              v-model="newTask.points"
              min="0"
              class="input mt-1"
              required
            >
          </div>
          <button type="submit" class="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>
    </div>

    <!-- Active tasks by category -->
    <div v-for="category in tasks.categories" :key="category.id" class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ category.name }} Tasks
        </h3>
        <div class="space-y-4">
          <div
            v-for="task in tasks.tasksByCategory[category.id]"
            :key="task.id"
            class="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <h4 class="font-medium text-gray-900">{{ task.title }}</h4>
                <span :class="['px-2 py-1 text-xs font-medium rounded-full', category.color]">
                  {{ category.name }}
                </span>
              </div>
              <p v-if="task.description" class="mt-1 text-sm text-gray-600">
                {{ task.description }}
              </p>
              <div class="mt-2 flex items-center space-x-4">
                <span class="text-sm text-gray-500">
                  Created: {{ new Date(task.createdAt).toLocaleDateString() }}
                </span>
                <span class="text-sm font-medium text-primary-600">
                  {{ task.points }} points
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="completeTask(task.id)"
                class="text-green-600 hover:text-green-800"
              >
                Complete
              </button>
              <button
                @click="deleteTask(task.id)"
                class="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
          <div v-if="!tasks.tasksByCategory[category.id]?.length" class="text-center text-gray-500 py-4">
            No tasks in this category
          </div>
        </div>
      </div>
    </div>

    <!-- Completed tasks -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Completed Tasks</h3>
        <div class="space-y-4">
          <div
            v-for="task in tasks.completedTasksList"
            :key="task.id"
            class="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <div class="flex items-center space-x-2">
                <h4 class="font-medium text-gray-900 line-through">{{ task.title }}</h4>
                <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                  tasks.categories.find(c => c.id === task.category)?.color]">
                  {{ tasks.categories.find(c => c.id === task.category)?.name }}
                </span>
              </div>
              <p v-if="task.description" class="mt-1 text-sm text-gray-600">
                {{ task.description }}
              </p>
              <div class="mt-2 flex items-center space-x-4">
                <span class="text-sm text-gray-500">
                  Completed: {{ new Date(task.completedAt).toLocaleDateString() }}
                </span>
                <span class="text-sm font-medium text-primary-600">
                  {{ task.points }} points
                </span>
              </div>
            </div>
          </div>
          <div v-if="!tasks.completedTasksList.length" class="text-center text-gray-500 py-4">
            No completed tasks yet
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { usePointsStore } from '../stores/points'

const tasks = useTasksStore()
const points = usePointsStore()

const newTask = ref({
  title: '',
  description: '',
  category: '',
  points: 0
})

const handleAddTask = () => {
  tasks.addTask(newTask.value)
  newTask.value = {
    title: '',
    description: '',
    category: '',
    points: 0
  }
}

const completeTask = (taskId) => {
  const task = tasks.tasks.find(t => t.id === taskId)
  if (task) {
    points.addPoints(task.points, `Completed task: ${task.title}`)
    tasks.completeTask(taskId)
  }
}

const deleteTask = (taskId) => {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.deleteTask(taskId)
  }
}
</script> 