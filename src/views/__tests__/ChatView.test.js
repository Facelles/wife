import { flushPromises, mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import ChatView from '../ChatView.vue'
import { useAuthStore } from '../../stores/auth'
import { nextTick } from 'process'

// Mock the database service
const mockListenToData = vi.fn()
const mockPushData = vi.fn()
const mockUpdateData = vi.fn()
const mockRemoveData = vi.fn()

vi.mock('../../firebase/database-service', () => ({
  listenToData: mockListenToData,
  pushData: mockPushData,
  updateData: mockUpdateData,
  removeData: mockRemoveData
}))

describe('ChatView', () => {
  let wrapper
  let authStore

  beforeEach(async () => {
    // Reset all mocks
    vi.clearAllMocks()
    
    // Setup Pinia
    const pinia = createPinia()
    setActivePinia(pinia)
    authStore = useAuthStore()
    authStore.user = {
      uid: 'test-uid',
      email: 'test@example.com'
    }

    // Setup mock data
    const testMessages = {
      'msg1': {
        id: 'msg1',
        text: 'Test message 1',
        userId: 'test-uid',
        userEmail: 'test@example.com',
        createdAt: Date.now()
      },
      'msg2': {
        id: 'msg2',
        text: 'Test message 2',
        userId: 'other-uid',
        userEmail: 'other@example.com',
        createdAt: Date.now()
      }
    }

    const testNotes = {
      'note1': {
        id: 'note1',
        title: 'Test Note 1',
        content: 'Content 1',
        userId: 'test-uid',
        userEmail: 'test@example.com',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      'note2': {
        id: 'note2',
        title: 'Test Note 2',
        content: 'Content 2',
        userId: 'other-uid',
        userEmail: 'other@example.com',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    }

    // Setup mock implementations
    mockListenToData.mockImplementation((path, callback) => {
      if (path === 'messages') {
        callback(testMessages)
      } else if (path === 'chatNotes') {
        callback(testNotes)
      } else if (path === 'moods/test-uid') {
        callback({})
      }
      return () => {}
    })

    mockPushData.mockResolvedValue({ key: 'new-id' })
    mockUpdateData.mockResolvedValue()
    mockRemoveData.mockResolvedValue()

    // Mock console.error
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // Mount component with global plugins
    wrapper = mount(ChatView, {
      global: {
        plugins: [pinia]
      }
    })

    // Wait for component to mount and data to load
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()
  })

  it('renders properly', () => {
    const title = wrapper.find('h1')
    expect(title.exists()).toBeTruthy()
    expect(title.text()).toBe('Чат')
    expect(wrapper.find('h2').text()).toBe('Notes')
  })

  it('displays messages', async () => {
    await flushPromises()
    await wrapper.vm.$nextTick()
    
    const messages = wrapper.findAll('.flex.items-start.space-x-4')
    expect(messages.length).toBe(2)
    
    const messageTexts = messages.map(msg => msg.find('.break-words').text())
    expect(messageTexts[0]).toBe('Test message 1')
    expect(messageTexts[1]).toBe('Test message 2')
  })

  it('sends new message', async () => {
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find('form')

    await input.setValue('New message')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockPushData).toHaveBeenCalledWith('messages', {
      text: 'New message',
      userId: 'test-uid',
      userEmail: 'test@example.com',
      createdAt: expect.any(Number)
    })
  })

  it('clears chat', async () => {
    global.confirm = vi.fn(() => true)
    const clearButton = wrapper.find('button[class*="bg-red-500"]')
    await clearButton.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockRemoveData).toHaveBeenCalledWith('messages')
  })

  it('displays notes', async () => {
    const notes = wrapper.findAll('[class*="rounded-lg"]')
    expect(notes.length).toBeGreaterThanOrEqual(2)
    expect(notes[0].text()).toContain('Test Note 1')
    expect(notes[1].text()).toContain('Test Note 2')
  })

  it('adds new note', async () => {
    const addButton = wrapper.find('button.btn-primary')
    await addButton.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const modal = wrapper.find('.fixed.inset-0')
    expect(modal.exists()).toBeTruthy()
    
    const titleInput = wrapper.find('#noteTitle')
    const contentInput = wrapper.find('#noteContent')
    const form = wrapper.find('form')
    
    await titleInput.setValue('New Note')
    await contentInput.setValue('Note content')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockPushData).toHaveBeenCalledWith('chatNotes', {
      title: 'New Note',
      content: 'Note content',
      userId: 'test-uid',
      userEmail: 'test@example.com',
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number)
    })
  })

  it('edits existing note', async () => {
    const editButton = wrapper.find('button[class*="text-primary-600"]')
    await editButton.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    const titleInput = wrapper.find('#noteTitle')
    const contentInput = wrapper.find('#noteContent')
    const form = wrapper.find('form')

    await titleInput.setValue('Updated Note')
    await contentInput.setValue('Updated content')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockUpdateData).toHaveBeenCalledWith('chatNotes/note1', {
      title: 'Updated Note',
      content: 'Updated content',
      userId: 'test-uid',
      userEmail: 'test@example.com',
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number)
    })
  })

  it('deletes note', async () => {
    global.confirm = vi.fn(() => true)
    const deleteButton = wrapper.find('button[class*="text-red-600"]')
    await deleteButton.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockRemoveData).toHaveBeenCalledWith('chatNotes/note1')
  })

  it('formats date correctly', () => {
    const date = new Date('2024-05-01T10:00:00')
    expect(wrapper.vm.formatDate(date)).toBe('01.05, 10:00')
  })

  it('handles empty message', async () => {
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find('form')

    await input.setValue('   ')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockPushData).not.toHaveBeenCalled()
  })

  it('handles note form validation', async () => {
    const addButton = wrapper.find('button.btn-primary')
    await addButton.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const form = wrapper.find('form')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockPushData).not.toHaveBeenCalled()
  })

  it('handles offline state', async () => {
    mockPushData.mockRejectedValue(new Error('Network error'))
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find('form')

    await input.setValue('Test message')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(console.error).toHaveBeenCalled()
  })

  it('handles note update conflicts', async () => {
    mockUpdateData.mockRejectedValue(new Error('Update conflict'))
    const editButton = wrapper.find('button[class*="text-primary-600"]')
    await editButton.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    const form = wrapper.find('form')
    await form.trigger('submit')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(console.error).toHaveBeenCalled()
  })

  it('handles user mood updates', async () => {
    await wrapper.vm.selectMood('😊')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockPushData).toHaveBeenCalledWith('moods/test-uid', {
      value: 'neutral',
      emoji: '😊',
      timestamp: expect.any(Number),
      userId: 'test-uid',
      userEmail: 'test@example.com'
    })
  })

  it('handles loading state', async () => {
    expect(wrapper.find('.animate-spin').exists()).toBe(false)
  })
}) 