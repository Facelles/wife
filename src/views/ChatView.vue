<template>
  <div class="space-y-6">
    <!-- Chat section -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Чат</h1>
          <button 
            @click="clearChat" 
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
          >
            <i class="material-icons mr-2">delete</i>
            Очистити чат
          </button>
        </div>
        
        <!-- Messages -->
        <div class="space-y-4 mb-6 max-h-[60vh] overflow-y-auto" ref="messagesContainer">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'flex items-start space-x-4',
              message.userId === authStore.user?.uid ? 'flex-row-reverse space-x-reverse' : ''
            ]"
          >
            <!-- User avatar/info -->
            <div class="flex-shrink-0">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="getUserStyle(message.userEmail).bgColor"
              >
                <span class="text-xl">
                  {{ getUserStyle(message.userEmail).emoji }}
                </span>
              </div>
              <div class="mt-1 text-xs text-center font-medium"
                :class="getUserStyle(message.userEmail).textColor"
              >
                {{ getUserStyle(message.userEmail).nickname }}
              </div>
            </div>

            <!-- Message content -->
            <div
              :class="[
                'flex max-w-[70%] rounded-lg px-4 py-2',
                message.userId === authStore.user?.uid
                  ? 'bg-primary-500 text-white'
                  : 'bg-pink-100 text-gray-900'
              ]"
            >
              <div>
                <div class="break-words">{{ message.text }}</div>
                <div 
                  :class="[
                    'text-xs mt-1',
                    message.userId === authStore.user?.uid
                      ? 'text-primary-100'
                      : 'text-gray-500'
                  ]"
                >
                  {{ formatDate(message.createdAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message input -->
        <form @submit.prevent="sendMessage" class="flex space-x-4">
          <input
            v-model="newMessage"
            type="text"
            class="flex-1 input"
            placeholder="Напишіть повідомлення..."
            required
          >
          <button type="submit" class="btn btn-primary">
            Надіслати
          </button>
        </form>
      </div>
    </div>

    <!-- Notes section -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-900">Notes</h2>
          <button
            @click="showAddNoteModal = true"
            class="btn btn-primary"
          >
            Add Note
          </button>
        </div>

        <!-- Notes list -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="note in notes"
            :key="note.id"
            class="p-4 bg-gray-50 rounded-lg"
          >
            <div class="flex justify-between items-start">
              <h3 class="font-medium text-gray-900">{{ note.title }}</h3>
              <div class="flex space-x-2">
                <button
                  @click="editNote(note)"
                  class="text-primary-600 hover:text-primary-800"
                >
                  Edit
                </button>
                <button
                  @click="deleteNote(note.id)"
                  class="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-600">{{ note.content }}</p>
            <p class="mt-2 text-xs text-gray-500">
              Last updated: {{ new Date(note.updatedAt).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Note Modal -->
    <div v-if="showAddNoteModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingNote ? 'Edit Note' : 'Add New Note' }}
        </h3>
        <form @submit.prevent="handleNoteSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              v-model="noteForm.title"
              class="input mt-1"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              v-model="noteForm.content"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            ></textarea>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeNoteModal"
              class="btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
            >
              {{ editingNote ? 'Update' : 'Add' }} Note
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useAuthStore } from '../stores/auth'
import { 
  listenToData, 
  pushData, 
  updateData, 
  removeData 
} from '../firebase/database-service'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

const messages = ref([])
const notes = ref([])
const newMessage = ref('')
const showAddNoteModal = ref(false)
const editingNote = ref(null)
const noteForm = ref({
  title: '',
  content: ''
})
const messagesContainer = ref(null)

// Прокрутка до останнього повідомлення
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

onMounted(() => {
  // Підписка на повідомлення
  listenToData('messages', (data) => {
    if (data) {
      messages.value = Object.entries(data)
        .map(([id, message]) => ({
          id,
          ...message,
          createdAt: new Date(message.createdAt)
        }))
        .sort((a, b) => a.createdAt - b.createdAt)
      
      nextTick(() => {
        scrollToBottom()
      })
    }
  })

  // Підписка на нотатки
  listenToData('notes', (data) => {
    if (data) {
      notes.value = Object.entries(data)
        .map(([id, note]) => ({
          id,
          ...note
        }))
        .filter(note => note.userId === currentUser.value?.uid)
    }
  })

  if (authStore.user) {
    // Слухаємо зміни настрою для конкретного користувача
    listenToData(`moods/${authStore.user.uid}`, (data) => {
      if (data) {
        const moodEntries = Object.entries(data)
          .map(([id, mood]) => ({
            id,
            ...mood,
            timestamp: new Date(mood.timestamp)
          }))
          .sort((a, b) => b.timestamp - a.timestamp)

        if (moodEntries.length > 0) {
          currentMood.value = moodEntries[0].emoji
        }
      }
    })
  }
})

// Відправка повідомлення
const sendMessage = async () => {
  if (newMessage.value.trim() && authStore.user) {
    try {
      const userEmail = authStore.user.email
      console.log('Sending message as:', userEmail) // Додаємо лог для перевірки
      
      await pushData('messages', {
        text: newMessage.value.trim(),
        userId: authStore.user.uid,
        userEmail: userEmail, // Переконуємось що використовуємо правильний email
        createdAt: Date.now()
      })
      
      newMessage.value = ''
      scrollToBottom()
    } catch (error) {
      console.error('Помилка при відправці повідомлення:', error)
      alert('Помилка при відправці повідомлення: ' + error.message)
    }
  }
}

// Очищення чату
const clearChat = async () => {
  if (confirm('Ви впевнені, що хочете очистити весь чат?')) {
    try {
      await removeData('messages')
      messages.value = []
      console.log('Чат успішно очищено')
    } catch (error) {
      console.error('Помилка при очищенні чату:', error)
    }
  }
}

// Обробка нотаток
const handleNoteSubmit = async () => {
  if (!currentUser.value) return

  try {
    if (editingNote.value) {
      await updateData(`notes/${editingNote.value.id}`, {
        ...noteForm.value,
        userId: currentUser.value.uid
      })
    } else {
      await pushData('notes', {
        ...noteForm.value,
        userId: currentUser.value.uid
      })
    }
    closeNoteModal()
  } catch (error) {
    console.error('Error saving note:', error)
  }
}

const editNote = (note) => {
  editingNote.value = note
  noteForm.value = {
    title: note.title,
    content: note.content
  }
  showAddNoteModal.value = true
}

const deleteNote = async (noteId) => {
  if (confirm('Are you sure you want to delete this note?')) {
    try {
      await removeData(`notes/${noteId}`)
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }
}

const closeNoteModal = () => {
  showAddNoteModal.value = false
  editingNote.value = null
  noteForm.value = {
    title: '',
    content: ''
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit'
  }).format(date)
}

const getUserInitials = (email) => {
  if (!email) return '?'
  const name = email.split('@')[0]
  return name.substring(0, 2).toUpperCase()
}

const getUserNickname = (email) => {
  if (!email) return 'Невідомий'
  return email.split('@')[0]
}

const getUserStyle = (email) => {
  console.log('Getting style for email:', email) // Додаємо лог для перевірки
  switch (email) {
    case 'facellesit@gmail.com':
      return {
        emoji: '🐰',
        nickname: 'Зайчик',
        bgColor: 'bg-primary-100',
        textColor: 'text-primary-600'
      }
    case 'martadaniluk4@gmail.com':                
      return {
        emoji: '😺',
        nickname: 'Кицюня',
        bgColor: 'bg-pink-100',
        textColor: 'text-pink-500'
      }
    default:
      return {
        emoji: '👤',
        nickname: email?.split('@')[0] || 'Невідомий',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600'
      }
  }
}

const selectMood = async (mood) => {
  if (!authStore.user) return
  
  try {
    // Додаємо ID користувача до шляху
    await pushData(`moods/${authStore.user.uid}`, {
      value: 'neutral',
      emoji: mood,
      timestamp: Date.now(),
      userId: authStore.user.uid,
      userEmail: authStore.user.email
    })
    currentMood.value = mood
  } catch (error) {
    console.error('Error setting mood:', error)
  }
}
</script> 