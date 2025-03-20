import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    notes: [],
    currentUser: 'user1' // This should be replaced with actual user identification
  }),

  getters: {
    allMessages: (state) => state.messages,
    allNotes: (state) => state.notes,
    messagesByDate: (state) => {
      const grouped = {}
      state.messages.forEach(message => {
        const date = new Date(message.timestamp).toLocaleDateString()
        if (!grouped[date]) {
          grouped[date] = []
        }
        grouped[date].push(message)
      })
      return grouped
    }
  },

  actions: {
    sendMessage(content) {
      this.messages.push({
        id: Date.now(),
        content,
        sender: this.currentUser,
        timestamp: new Date().toISOString()
      })
    },

    addNote(title, content) {
      this.notes.push({
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    },

    updateNote(noteId, updates) {
      const noteIndex = this.notes.findIndex(note => note.id === noteId)
      if (noteIndex !== -1) {
        this.notes[noteIndex] = {
          ...this.notes[noteIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }
    },

    deleteNote(noteId) {
      const noteIndex = this.notes.findIndex(note => note.id === noteId)
      if (noteIndex !== -1) {
        this.notes.splice(noteIndex, 1)
      }
    }
  }
}) 