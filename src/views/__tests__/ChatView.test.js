import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import ChatView from '../ChatView.vue'
import { useAuthStore } from '@/stores/auth'
import { mockListenToData, mockPushData, mockUpdateData, mockRemoveData } from './setup'

describe('ChatView', () => {
  let wrapper
  let authStore

  beforeEach(async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    authStore = useAuthStore()

    // Mock auth store
    authStore.user = {
      uid: 'test-uid',
      email: 'facellesit@gmail.com',
      displayName: 'Test User'
    }

    // Mock listenToData
    mockListenToData.mockImplementation((path, callback) => {
      if (path === 'messages') {
        callback({
          '1': {
            id: '1',
            text: 'Test message 1',
            userId: 'test-uid',
            userEmail: 'facellesit@gmail.com',
            createdAt: Date.now()
          },
          '2': {
            id: '2',
            text: 'Test message 2',
            userId: 'other-uid',
            userEmail: 'martadaniluk4@gmail.com',
            createdAt: Date.now()
          }
        })
      } else if (path === 'chatNotes') {
        callback({
          '1': {
            id: '1',
            title: 'Test Note 1',
            content: 'Test content 1',
            userId: 'test-uid',
            userEmail: 'facellesit@gmail.com',
            createdAt: Date.now(),
            updatedAt: Date.now()
          }
        })
      } else if (path === 'moods/test-uid') {
        callback({
          '1': {
            id: '1',
            value: 'happy',
            emoji: '😊',
            timestamp: Date.now(),
            userId: 'test-uid',
            userEmail: 'facellesit@gmail.com'
          }
        })
      }
      return () => {}
    })

    wrapper = mount(ChatView, {
      global: {
        plugins: [pinia],
        stubs: ['router-link']
      }
    })
    await wrapper.vm.$nextTick()
  })

  it('renders properly', () => {
    const title = wrapper.find('h1')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Чат')
  })

  it('displays messages', async () => {
    await wrapper.vm.$nextTick()
    const messages = wrapper.findAll('.flex.items-start.space-x-4')
    expect(messages.length).toBe(2)
  })

  it('displays correct user styles for messages', async () => {
    await wrapper.vm.$nextTick()
    const userStyles = wrapper.vm.getUserStyle('facellesit@gmail.com')
    expect(userStyles.emoji).toBe('🐰')
    expect(userStyles.nickname).toBe('Зайчик')
  })

  it('sends new message when form is submitted', async () => {
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find('form')
    
    await input.setValue('New test message')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.newMessage).toBe('')
  })

  it('clears chat when clear button is clicked', async () => {
    window.confirm = vi.fn(() => true)
    const clearButton = wrapper.find('button:contains("Очистити чат")')
    await clearButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(window.confirm).toHaveBeenCalled()
  })

  it('displays notes section', async () => {
    const notesTitle = wrapper.find('h2:contains("Notes")')
    expect(notesTitle.exists()).toBe(true)
  })

  it('shows add note modal when add button is clicked', async () => {
    const addButton = wrapper.find('button:contains("Add Note")')
    await addButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    const modal = wrapper.find('.fixed')
    expect(modal.exists()).toBe(true)
    const modalTitle = modal.find('h3')
    expect(modalTitle.exists()).toBe(true)
    expect(modalTitle.text()).toBe('Add New Note')
  })

  it('adds new note when form is submitted', async () => {
    const addButton = wrapper.find('button:contains("Add Note")')
    await addButton.trigger('click')
    await wrapper.vm.$nextTick()

    const titleInput = wrapper.find('#noteTitle')
    const contentInput = wrapper.find('#noteContent')
    const submitButton = wrapper.find('button[type="submit"]')

    await titleInput.setValue('New Note')
    await contentInput.setValue('New content')
    await submitButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.showAddNoteModal).toBe(false)
  })

  it('edits existing note', async () => {
    const editButton = wrapper.find('button:contains("Edit")')
    await editButton.trigger('click')
    await wrapper.vm.$nextTick()

    const titleInput = wrapper.find('#noteTitle')
    const contentInput = wrapper.find('#noteContent')
    const submitButton = wrapper.find('button[type="submit"]')

    await titleInput.setValue('Updated Note')
    await contentInput.setValue('Updated content')
    await submitButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.showAddNoteModal).toBe(false)
  })

  it('deletes note when delete button is clicked', async () => {
    window.confirm = vi.fn(() => true)
    const deleteButton = wrapper.find('button:contains("Видалити")')
    await deleteButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(window.confirm).toHaveBeenCalled()
  })

  it('formats date correctly', () => {
    const date = new Date('2024-05-01T10:00:00')
    const formattedDate = wrapper.vm.formatDate(date)
    expect(formattedDate).toMatch(/\d{2}:\d{2}, \d{2}\.\d{2}/)
  })

  it('handles empty messages', async () => {
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find('form')
    
    await input.setValue('   ')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.messages.length).toBe(2) // Should not add empty message
  })

  it('shows correct user styles for different emails', () => {
    const user1Style = wrapper.vm.getUserStyle('facellesit@gmail.com')
    const user2Style = wrapper.vm.getUserStyle('martadaniluk4@gmail.com')
    const unknownStyle = wrapper.vm.getUserStyle('unknown@email.com')

    expect(user1Style.emoji).toBe('🐰')
    expect(user2Style.emoji).toBe('😺')
    expect(unknownStyle.emoji).toBe('👤')
  })

  it('closes note modal when cancel is clicked', async () => {
    const addButton = wrapper.find('button:contains("Add Note")')
    await addButton.trigger('click')
    await wrapper.vm.$nextTick()

    const cancelButton = wrapper.find('button:contains("Cancel")')
    await cancelButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.showAddNoteModal).toBe(false)
  })

  it('handles note form validation', async () => {
    const addButton = wrapper.find('button:contains("Add Note")')
    await addButton.trigger('click')
    await wrapper.vm.$nextTick()

    const submitButton = wrapper.find('button[type="submit"]')
    await submitButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.showAddNoteModal).toBe(true) // Modal should stay open
  })

  it('scrolls to bottom when new message is added', async () => {
    const scrollToBottom = vi.spyOn(wrapper.vm, 'scrollToBottom')
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find('form')
    
    await input.setValue('New message')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()

    expect(scrollToBottom).toHaveBeenCalled()
  })

  it('handles user mood updates', async () => {
    const mood = '😊'
    await wrapper.vm.selectMood(mood)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentMood).toBe(mood)
  })

  it('handles network errors when sending message', async () => {
    mockPushData.mockRejectedValueOnce(new Error('Network error'))
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find('form')
    
    await input.setValue('Test message')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()
    
    expect(console.error).toHaveBeenCalled()
  })

  it('validates message length', async () => {
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find('form')
    
    await input.setValue('a'.repeat(1001)) // Exceed limit
    await form.trigger('submit')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.messages.length).toBe(2) // Message not added
  })

  it('handles offline state', async () => {
    mockListenToData.mockImplementationOnce(() => {
      throw new Error('Offline')
    })
    
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.error).toBeTruthy()
  })

  it('sorts notes by date', async () => {
    await wrapper.vm.$nextTick()
    const notes = wrapper.vm.notes
    expect(notes[0].createdAt).toBeGreaterThan(notes[1].createdAt)
  })

  it('shows loading state while fetching data', async () => {
    wrapper.vm.isLoading = true
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })

  it('handles invalid note data', async () => {
    mockListenToData.mockImplementationOnce((path, callback) => {
      if (path === 'chatNotes') {
        callback({
          '1': {
            id: '1',
            // Missing required fields
            createdAt: Date.now()
          }
        })
      }
      return () => {}
    })
    
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.notes.length).toBe(0)
  })

  it('handles note update conflicts', async () => {
    mockUpdateData.mockRejectedValueOnce(new Error('Conflict'))
    const editButton = wrapper.find('button:contains("Edit")')
    await editButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    const submitButton = wrapper.find('button[type="submit"]')
    await submitButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(console.error).toHaveBeenCalled()
  })

  it('handles message deletion confirmation', async () => {
    window.confirm = vi.fn(() => false)
    const deleteButton = wrapper.find('button:contains("Видалити")')
    await deleteButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(mockRemoveData).not.toHaveBeenCalled()
  })

  it('handles user mood updates with error', async () => {
    mockPushData.mockRejectedValueOnce(new Error('Failed to update mood'))
    const mood = '😊'
    await wrapper.vm.selectMood(mood)
    await wrapper.vm.$nextTick()
    
    expect(console.error).toHaveBeenCalled()
  })
}) 