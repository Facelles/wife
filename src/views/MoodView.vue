<template>
  <div class="space-y-6 max-w-2xl mx-auto px-4 py-8">
    <!-- Today's mood -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Як ви почуваєтесь сьогодні?</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            v-for="mood in moods"
            :key="mood.value"
            @click="selectMood(mood)"
            :class="[
              'flex flex-col items-center p-4 rounded-lg border-2 transition-colors',
              currentMood?.value === mood.value
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
          <label class="block text-sm font-medium text-gray-700">Додайте нотатку про свій день</label>
          <textarea
            v-model="moodNote"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Що у вас на думці?"
          ></textarea>
          <button
            @click="saveMood"
            class="mt-4 btn btn-primary"
          >
            Зберегти настрій
          </button>
        </div>
      </div>
    </div>

    <!-- Mood history -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Історія настрою</h3>
        <div class="space-y-4">
          <div
            v-for="entry in moodHistory"
            :key="entry.id"
            v-if="entry.value"
            class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <span class="text-2xl">
              {{ moods.find(m => m.value === entry.value)?.emoji || entry.emoji }}
            </span>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <span class="font-medium">
                  {{ moods.find(m => m.value === entry.value)?.label || '' }}
                  <span v-if="entry.userType === 'partner'" class="ml-2 text-xs text-pink-500">(Партнер)</span>
                </span>
                <span class="text-sm text-gray-500">
                  {{ entry.createdAt ? entry.createdAt.toLocaleDateString() : '' }}
                </span>
              </div>
              <p v-if="entry.note" class="mt-1 text-sm text-gray-600">
                {{ entry.note }}
              </p>
            </div>
          </div>
          <div v-if="!moodHistory.length" class="text-center text-gray-500 py-4">
            Поки що немає записів
          </div>
        </div>
      </div>
    </div>

    <!-- Mood statistics -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Статистика настрою</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            v-for="mood in moods"
            :key="mood.value"
            class="p-4 bg-gray-50 rounded-lg text-center"
          >
            <span class="text-2xl block mb-2">{{ mood.emoji }}</span>
            <span class="text-sm font-medium text-gray-700">{{ mood.label }}</span>
            <span class="block text-lg font-semibold text-primary-600 mt-1">
              {{ getMoodCount(mood.value) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mood Selection Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showMoodModal" class="modal-overlay" @click="closeMoodModal">
          <div class="modal-content" @click.stop>
            <h2 class="text-xl font-bold mb-4">Оберіть свій настрій</h2>
            
            <div class="grid grid-cols-3 gap-4 mb-6">
              <button
                v-for="mood in moods"
                :key="mood.value"
                @click="selectedMood = mood.value"
                class="p-4 rounded-lg transition-all duration-200 flex flex-col items-center gap-2"
                :class="[
                  selectedMood === mood.value
                    ? 'bg-primary/20 border-2 border-primary'
                    : 'bg-white/10 hover:bg-white/20'
                ]"
              >
                <span class="text-3xl">{{ mood.emoji }}</span>
                <span class="text-sm">{{ mood.label }}</span>
              </button>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Дата</label>
                <input
                  type="date"
                  v-model="selectedDate"
                  class="w-full p-2 rounded-lg bg-white/10 border border-white/20"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Час</label>
                <input
                  type="time"
                  v-model="selectedTime"
                  class="w-full p-2 rounded-lg bg-white/10 border border-white/20"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Нотатка</label>
                <textarea
                  v-model="selectedNote"
                  class="w-full p-2 rounded-lg bg-white/10 border border-white/20"
                  rows="3"
                  placeholder="Додайте нотатку..."
                ></textarea>
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button
                @click="closeMoodModal"
                class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                Скасувати
              </button>
              <button
                @click="applyMoodChanges"
                class="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Збереження...' : 'Застосувати зміни' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData } from '../firebase/database-service'
import { db, push, set } from '../firebase/firebase'

const authStore = useAuthStore()
const moodNote = ref('')
const currentMood = ref(null)
const moodHistory = ref([])
const selectedMood = ref(null)
const showMoodModal = ref(false)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedTime = ref(new Date().toTimeString().slice(0, 5))
const selectedNote = ref('')
const isSubmitting = ref(false)

const moods = [
  { value: 1, emoji: '😢', label: 'Дуже погано' },
  { value: 2, emoji: '😕', label: 'Погано' },
  { value: 3, emoji: '😐', label: 'Нормально' },
  { value: 4, emoji: '🙂', label: 'Добре' },
  { value: 5, emoji: '😄', label: 'Чудово' }
]

onMounted(() => {
  if (!authStore.user) return
  listenToData('moodmain', (data) => {
    let allMoods = []
    if (data) {
      if (data[authStore.user.uid]) {
        allMoods = allMoods.concat(
          Object.entries(data[authStore.user.uid])
            .map(([id, mood]) => ({
              ...mood,
              id,
              userType: 'me',
              createdAt: mood.createdAt || mood.timestamp ? new Date(mood.createdAt || mood.timestamp) : new Date(0)
            }))
        )
      }
      const partnerUid = Object.keys(data).find(uid => uid !== authStore.user.uid)
      if (partnerUid && data[partnerUid]) {
        allMoods = allMoods.concat(
          Object.entries(data[partnerUid])
            .map(([id, mood]) => ({
              ...mood,
              id,
              userType: 'partner',
              createdAt: mood.createdAt || mood.timestamp ? new Date(mood.createdAt || mood.timestamp) : new Date(0)
            }))
        )
      }
    }
    moodHistory.value = allMoods
      .filter(m => m.value)
      .sort((a, b) => b.createdAt - a.createdAt)
    const myMoods = moodHistory.value.filter(m => m.userType === 'me')
    if (myMoods.length) {
      const found = moods.find(m => m.value === myMoods[0].value)
      currentMood.value = found || null
    } else {
      currentMood.value = null
    }
  })
})

const selectMood = (mood) => {
  currentMood.value = mood
}

const saveMood = async () => {
  if (!currentMood.value || !authStore.user) return
  try {
    await pushData(`moodmain/${authStore.user.uid}`, {
      value: currentMood.value.value,
      emoji: currentMood.value.emoji,
      note: moodNote.value.trim(),
      createdAt: Date.now(),
      userId: authStore.user.uid,
      userEmail: authStore.user.email
    })
    moodNote.value = ''
    currentMood.value = null
  } catch (error) {
    console.error('Помилка при збереженні настрою:', error)
    alert('Помилка при збереженні настрою')
  }
}

const getMoodCount = (value) => {
  return moodHistory.value.filter(entry => entry.value === value).length
}

const openMoodModal = () => {
  selectedMood.value = null
  selectedDate.value = new Date().toISOString().split('T')[0]
  selectedTime.value = new Date().toTimeString().slice(0, 5)
  selectedNote.value = ''
  showMoodModal.value = true
}

const closeMoodModal = () => {
  showMoodModal.value = false
  selectedMood.value = null
  selectedDate.value = new Date().toISOString().split('T')[0]
  selectedTime.value = new Date().toTimeString().slice(0, 5)
  selectedNote.value = ''
}

const applyMoodChanges = async () => {
  if (!selectedMood.value) {
    alert('Будь ласка, оберіть настрій')
    return
  }

  isSubmitting.value = true
  try {
    const timestamp = new Date(`${selectedDate.value}T${selectedTime.value}`).getTime()
    const moodData = {
      mood: selectedMood.value,
      timestamp,
      note: selectedNote.value,
      date: selectedDate.value,
      time: selectedTime.value
    }

    const moodRef = ref(db, `moodmain/${authStore.user.uid}`)
    const newMoodRef = push(moodRef)
    await set(newMoodRef, moodData)
    
    closeMoodModal()
  } catch (error) {
    console.error('Error saving mood:', error)
    alert('Помилка при збереженні настрою')
  } finally {
    isSubmitting.value = false
  }
}
</script>
<style scoped>
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
}
.btn:focus {
  outline: none;
  --tw-ring-offset-width: 2px;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.btn-primary {
  background-color: rgb(79 70 229);
  color: white;
}
.btn-primary:hover {
  background-color: rgb(67 56 202);
}
.btn-primary:focus {
  --tw-ring-color: rgb(99 102 241);
}
</style>