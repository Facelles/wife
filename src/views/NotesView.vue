<template>
  <div class="space-y-6">
    <!-- Notes header -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Нотатки</h2>
          <button
            @click="openNoteModal()"
            class="btn btn-primary"
          >
            Нова нотатка
          </button>
        </div>
      </div>
    </div>

    <!-- Notes list -->
    <div class="space-y-4">
      <div
        v-for="note in notes"
        :key="note.id"
        class="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">
                {{ note.title }}
              </h3>
              <p class="mt-2 text-gray-500 whitespace-pre-wrap">
                {{ note.content }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="openNoteModal(note)"
                class="text-gray-400 hover:text-gray-500"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="deleteNote(note.id)"
                class="text-red-400 hover:text-red-500"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Note metadata -->
          <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div>
              <span class="font-medium">Створено:</span>
              {{ new Date(note.createdAt).toLocaleString() }}
            </div>
            <div v-if="note.updatedAt">
              <span class="font-medium">Оновлено:</span>
              {{ new Date(note.updatedAt).toLocaleString() }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="!notes.length" class="text-center py-12 bg-white rounded-lg">
        <p class="text-gray-500">Немає нотаток для відображення</p>
      </div>
    </div>

    <!-- Note modal -->
    <div v-if="showNoteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md mx-auto transform transition-all">
        <h3 class="text-xl font-medium text-gray-900 mb-4 text-center">
          {{ selectedNote ? 'Редагувати нотатку' : 'Нова нотатка' }}
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Заголовок</label>
            <input
              v-model="noteForm.title"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Текст</label>
            <textarea
              v-model="noteForm.content"
              rows="5"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            ></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            v-if="selectedNote"
            @click="deleteNote(selectedNote.id)"
            class="btn btn-danger"
          >
            Видалити
          </button>
          <button
            @click="closeNoteModal"
            class="btn btn-secondary"
          >
            Скасувати
          </button>
          <button
            @click="saveNote"
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData, updateData, deleteData } from '../firebase/database-service'

const authStore = useAuthStore()
const notes = ref([])
const showNoteModal = ref(false)
const selectedNote = ref(null)

const noteForm = ref({
  title: '',
  content: ''
})

// Завантаження нотаток
const loadNotes = async () => {
  if (!authStore.user) return

  try {
    listenToData('notes', (data) => {
      if (!data) return
      
      notes.value = Object.entries(data)
        .map(([id, note]) => ({
          id,
          ...note
        }))
        .filter(note => note.userId === authStore.user.uid)
        .sort((a, b) => b.createdAt - a.createdAt)
    })
  } catch (error) {
    console.error('Помилка при завантаженні нотаток:', error)
  }
}

onMounted(() => {
  loadNotes()
})

const openNoteModal = (note = null) => {
  selectedNote.value = note
  if (note) {
    noteForm.value = { ...note }
  } else {
    noteForm.value = {
      title: '',
      content: ''
    }
  }
  showNoteModal.value = true
}

const closeNoteModal = () => {
  showNoteModal.value = false
  selectedNote.value = null
}

const saveNote = async () => {
  if (!noteForm.value.title || !noteForm.value.content) {
    alert('Будь ласка, заповніть всі поля')
    return
  }

  try {
    const noteData = {
      ...noteForm.value,
      userId: authStore.user.uid,
      userEmail: authStore.user.email,
      createdAt: selectedNote.value?.createdAt || Date.now(),
      updatedAt: Date.now()
    }

    if (selectedNote.value) {
      await updateData(`notes/${selectedNote.value.id}`, noteData)
    } else {
      await pushData('notes', noteData)
    }

    closeNoteModal()
  } catch (error) {
    console.error('Помилка при збереженні нотатки:', error)
    alert('Помилка при збереженні нотатки')
  }
}

const deleteNote = async (noteId) => {
  if (!noteId) return
  
  if (confirm('Ви впевнені, що хочете видалити цю нотатку?')) {
    try {
      await deleteData(`notes/${noteId}`)
      if (selectedNote.value?.id === noteId) {
        closeNoteModal()
      }
    } catch (error) {
      console.error('Помилка при видаленні нотатки:', error)
      alert('Помилка при видаленні нотатки')
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