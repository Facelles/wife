<template>
  <div class="space-y-6">
    <!-- Sleep overview -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Sleep Overview</h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Average Sleep Hours</dt>
            <dd class="mt-1 text-3xl font-semibold text-primary-600">{{ sleep.averageSleepHours }}h</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Sleep Quality</dt>
            <dd class="mt-1 text-3xl font-semibold text-primary-600">{{ sleep.sleepQuality }}%</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Today's Sleep</dt>
            <dd class="mt-1 text-3xl font-semibold text-primary-600">
              {{ sleep.todaySleep?.hours || '0' }}h
            </dd>
          </div>
        </div>
      </div>
    </div>

    <!-- Add sleep record -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Record Today's Sleep</h3>
        <form @submit.prevent="handleAddSleep" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Hours of Sleep</label>
            <input
              type="number"
              v-model="newSleep.hours"
              step="0.5"
              min="0"
              max="24"
              class="input mt-1"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Sleep Quality (1-10)</label>
            <input
              type="number"
              v-model="newSleep.quality"
              min="1"
              max="10"
              class="input mt-1"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              v-model="newSleep.notes"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="How did you sleep?"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            Save Sleep Record
          </button>
        </form>
      </div>
    </div>

    <!-- Sleep history -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Sleep History</h3>
        <div class="space-y-4">
          <div
            v-for="record in sleep.sleepHistory"
            :key="record.date"
            class="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <div class="flex items-center space-x-2">
                <span class="font-medium">{{ record.hours }}h</span>
                <span class="text-sm text-gray-500">of sleep</span>
              </div>
              <p class="text-sm text-gray-500 mt-1">
                {{ new Date(record.date).toLocaleDateString() }}
              </p>
              <p v-if="record.notes" class="mt-2 text-sm text-gray-600">
                {{ record.notes }}
              </p>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">
                Quality: {{ record.quality }}/10
              </div>
              <div
                :class="[
                  'text-sm mt-1',
                  record.hours >= sleep.sleepGoals.minHours && record.hours <= sleep.sleepGoals.maxHours
                    ? 'text-green-600'
                    : 'text-red-600'
                ]"
              >
                {{ record.hours >= sleep.sleepGoals.minHours && record.hours <= sleep.sleepGoals.maxHours
                  ? 'Good sleep'
                  : 'Outside target range' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sleep goals -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Sleep Goals</h3>
        <form @submit.prevent="updateGoals" class="space-y-4">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-gray-700">Minimum Hours</label>
              <input
                type="number"
                v-model="goals.minHours"
                min="0"
                max="24"
                class="input mt-1"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Maximum Hours</label>
              <input
                type="number"
                v-model="goals.maxHours"
                min="0"
                max="24"
                class="input mt-1"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Target Bedtime</label>
              <input
                type="time"
                v-model="goals.targetBedtime"
                class="input mt-1"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Target Wake-up</label>
              <input
                type="time"
                v-model="goals.targetWakeup"
                class="input mt-1"
                required
              >
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Update Goals
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSleepStore } from '../stores/sleep'

const sleep = useSleepStore()
const newSleep = ref({
  hours: 0,
  quality: 5,
  notes: ''
})

const goals = ref({ ...sleep.sleepGoals })

const handleAddSleep = () => {
  sleep.addSleepRecord(newSleep.value.hours, newSleep.value.quality, newSleep.value.notes)
  newSleep.value = { hours: 0, quality: 5, notes: '' }
}

const updateGoals = () => {
  sleep.updateSleepGoals(goals.value)
}
</script> 