import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])
  const currentNote = ref(null)

  const setNotes = (newNotes) => {
    notes.value = newNotes
  }

  const setCurrentNote = (note) => {
    currentNote.value = note
  }

  const addNote = (note) => {
    notes.value.push(note)
  }

  const updateNote = (id, updatedNote) => {
    const index = notes.value.findIndex(note => note.id === id)
    if (index !== -1) {
      notes.value[index] = { ...notes.value[index], ...updatedNote }
    }
  }

  const deleteNote = (id) => {
    notes.value = notes.value.filter(note => note.id !== id)
  }

  return {
    notes,
    currentNote,
    setNotes,
    setCurrentNote,
    addNote,
    updateNote,
    deleteNote
  }
}) 