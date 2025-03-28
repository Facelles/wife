<template>
  <div class="space-y-6">
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
            :key="entry.createdAt"
            class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <span class="text-2xl">
              {{ moods.find(m => m.value === entry.value)?.emoji }}
            </span>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <span class="font-medium">
                  {{ moods.find(m => m.value === entry.value)?.label }}
                </span>
                <span class="text-sm text-gray-500">
                  {{ new Date(entry.createdAt).toLocaleDateString() }}
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { db } from '../firebase'
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'

const authStore = useAuthStore()
const moodNote = ref('')
const currentMood = ref(null)
const moodHistory = ref([])

const moods = [
  { value: 1, emoji: '😢', label: 'Дуже погано' },
  { value: 2, emoji: '😕', label: 'Погано' },
  { value: 3, emoji: '😐', label: 'Нормально' },
  { value: 4, emoji: '🙂', label: 'Добре' },
  { value: 5, emoji: '😄', label: 'Чудово' }
]

onMounted(() => {
  if (!authStore.user) return

  // Підписуємось на зміни в настрої
  const q = query(
    collection(db, 'moods'),
    where('userId', '==', authStore.user.uid),
    orderBy('createdAt', 'desc')
  )

  const unsubscribe = onSnapshot(q, (snapshot) => {
    moodHistory.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }))
  })

  // Відписуємось при розмонтуванні компонента
  onUnmounted(() => unsubscribe())
})

const selectMood = (mood) => {
  currentMood.value = mood
}

const saveMood = async () => {
  if (!currentMood.value || !authStore.user) return

  try {
    await addDoc(collection(db, 'moods'), {
      userId: authStore.user.uid,
      value: currentMood.value.value,
      note: moodNote.value.trim(),
      createdAt: serverTimestamp()
    })

    moodNote.value = ''
    currentMood.value = null
  } catch (error) {
    console.error('Помилка при збереженні настрою:', error)
  }
}

const getMoodCount = (value) => {
  return moodHistory.value.filter(entry => entry.value === value).length
}
</script> 