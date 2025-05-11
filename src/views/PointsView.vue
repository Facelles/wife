<template>
  <div class="space-y-6">
    <!-- Points overview -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Points Overview</h2>
        <div class="flex items-center justify-between">
          <div>
            <dt class="text-sm font-medium text-gray-500">Total Points</dt>
            <dd class="mt-1 text-3xl font-semibold text-primary-600">{{ points.totalPoints }}</dd>
          </div>
          <button @click="showAddPointsModal = true" class="btn btn-primary">
            Add Points
          </button>
        </div>
      </div>
    </div>

    <!-- Points history -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Points History</h3>
        <div class="space-y-4">
          <div v-for="entry in points.pointsHistory" :key="entry.id" 
               class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium">{{ entry.description }}</p>
              <p class="text-sm text-gray-500">{{ new Date(entry.timestamp).toLocaleDateString() }}</p>
            </div>
            <span class="text-lg font-semibold text-primary-600">+{{ entry.amount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Available rewards -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Available Rewards</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="reward in points.availableRewards" :key="reward.id"
               class="p-4 border rounded-lg hover:border-primary-500 transition-colors">
            <h4 class="font-medium text-gray-900">{{ reward.name }}</h4>
            <p class="text-sm text-gray-500 mt-1">{{ reward.description }}</p>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-primary-600 font-medium">{{ reward.points }} points</span>
              <button @click="redeemReward(reward.id)" class="btn btn-primary">
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add points modal -->
    <div v-if="showAddPointsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md mx-auto transform transition-all">
        <h3 class="text-xl font-medium text-gray-900 mb-4 text-center">Додати бали</h3>
        <form @submit.prevent="handleAddPoints" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Кількість</label>
            <input 
              type="number" 
              v-model="newPoints.amount" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" 
              min="1" 
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Опис</label>
            <input 
              type="text" 
              v-model="newPoints.description" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" 
              required
            >
          </div>
          <div class="flex justify-end space-x-3">
            <button 
              type="button" 
              @click="showAddPointsModal = false" 
              class="btn btn-secondary"
            >
              Скасувати
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
            >
              Додати бали
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePointsStore } from '../stores/points'

const points = usePointsStore()
const showAddPointsModal = ref(false)
const newPoints = ref({
  amount: 0,
  description: ''
})

const handleAddPoints = () => {
  points.addPoints(newPoints.value.amount, newPoints.value.description)
  showAddPointsModal.value = false
  newPoints.value = { amount: 0, description: '' }
}

const redeemReward = (rewardId) => {
  if (points.redeemReward(rewardId)) {
    alert('Reward redeemed successfully!')
  } else {
    alert('Not enough points to redeem this reward.')
  }
}
</script> 