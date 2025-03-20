<template>
  <div class="space-y-6">
    <!-- Today's mood -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">How are you feeling today?</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            v-for="mood in mood.moodOptions"
            :key="mood.id"
            @click="selectMood(mood.id)"
            :class="[
              'flex flex-col items-center p-4 rounded-lg border-2 transition-colors',
              mood.todayMood?.moodId === mood.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            ]"
          >
            <span class="text-4xl mb-2">{{ mood.emoji }}</span>
            <span class="text-sm font-medium text-gray-700">{{ mood.label }}</span>
          </button>
        </div>
        
        <!-- Mood note -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700">Add a note about your day</label>
          <textarea
            v-model="moodNote"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="What's on your mind?"
          ></textarea>
          <button
            @click="saveMood"
            class="mt-4 btn btn-primary"
          >
            Save Mood
          </button>
        </div>
      </div>
    </div>

    <!-- Mood history -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Mood History</h3>
        <div class="space-y-4">
          <div
            v-for="entry in mood.moodHistory"
            :key="entry.date"
            class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <span class="text-2xl">
              {{ mood.moodOptions.find(m => m.id === entry.moodId)?.emoji }}
            </span>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <span class="font-medium">
                  {{ mood.moodOptions.find(m => m.id === entry.moodId)?.label }}
                </span>
                <span class="text-sm text-gray-500">
                  {{ new Date(entry.date).toLocaleDateString() }}
                </span>
              </div>
              <p v-if="entry.note" class="mt-1 text-sm text-gray-600">
                {{ entry.note }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mood statistics -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Mood Statistics</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            v-for="(count, moodId) in mood.moodStats"
            :key="moodId"
            class="p-4 bg-gray-50 rounded-lg text-center"
          >
            <span class="text-2xl block mb-2">
              {{ mood.moodOptions.find(m => m.id === moodId)?.emoji }}
            </span>
            <span class="text-sm font-medium text-gray-700">
              {{ mood.moodOptions.find(m => m.id === moodId)?.label }}
            </span>
            <span class="block text-lg font-semibold text-primary-600 mt-1">
              {{ count }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMoodStore } from '../stores/mood'

const mood = useMoodStore()
const moodNote = ref('')

const selectMood = (moodId) => {
  mood.addMood(moodId, moodNote.value)
}

const saveMood = () => {
  if (mood.todayMood?.moodId) {
    mood.addMood(mood.todayMood.moodId, moodNote.value)
    moodNote.value = ''
  }
}
</script> 