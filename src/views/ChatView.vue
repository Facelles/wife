<template>
  <div class="space-y-6">
    <!-- Chat section -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Chat</h2>
        
        <!-- Messages -->
        <div class="space-y-6 mb-6" ref="messagesContainer">
          <div v-for="(messages, date) in groupedMessages" :key="date" class="space-y-4">
            <div class="text-center">
              <span class="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                {{ date }}
              </span>
            </div>
            <div
              v-for="message in messages"
              :key="message.id"
              :class="[
                'flex',
                message.userId === currentUser?.uid ? 'justify-end' : 'justify-start'
              ]"
            >
              <div
                :class="[
                  'max-w-[70%] rounded-lg px-4 py-2',
                  message.userId === currentUser?.uid
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                ]"
              >
                <p class="text-sm">{{ message.content }}</p>
                <p class="text-xs mt-1 opacity-75">
                  {{ new Date(message.createdAt).toLocaleTimeString() }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Message input -->
        <form @submit.prevent="handleSendMessage" class="flex space-x-4">
          <input
            v-model="newMessage"
            type="text"
            class="flex-1 input"
            placeholder="Type a message..."
            required
          >
          <button type="submit" class="btn btn-primary">
            Send
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { 
  sendMessage, 
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

// Групування повідомлень за датою
const groupedMessages = computed(() => {
  const groups = {}
  messages.value.forEach(message => {
    const date = new Date(message.createdAt).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
  })
  return groups
})

// Відправка повідомлення
const handleSendMessage = async () => {
  if (newMessage.value.trim() && currentUser.value) {
    try {
      await sendMessage(currentUser.value.uid, newMessage.value.trim())
      newMessage.value = ''
      scrollToBottom()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
}

// Прокрутка до нижньої частини чату
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
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

// Підписка на повідомлення та нотатки
let unsubscribeMessages
let unsubscribeNotes

onMounted(() => {
  // Підписка на повідомлення
  unsubscribeMessages = listenToData('messages', (data) => {
    if (data) {
      messages.value = Object.entries(data).map(([id, message]) => ({
        id,
        ...message
      }))
      scrollToBottom()
    }
  })

  // Підписка на нотатки
  unsubscribeNotes = listenToData('notes', (data) => {
    if (data) {
      notes.value = Object.entries(data)
        .map(([id, note]) => ({
          id,
          ...note
        }))
        .filter(note => note.userId === currentUser.value?.uid)
    }
  })
})

onUnmounted(() => {
  // Відписка від прослуховування
  if (unsubscribeMessages) unsubscribeMessages()
  if (unsubscribeNotes) unsubscribeNotes()
})
</script> 