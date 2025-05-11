<template>
  <div class="space-y-6">
    <!-- Calendar header -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Календар подій</h2>
          <button
            @click="openEventModal()"
            class="btn btn-primary"
          >
            Додати подію
          </button>
        </div>
        
        <!-- Calendar navigation -->
        <div class="flex items-center justify-between mt-4">
          <button
            @click="previousMonth"
            class="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 class="text-lg font-medium">{{ currentMonthName }} {{ currentYear }}</h3>
          <button
            @click="nextMonth"
            class="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Calendar grid -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <!-- Days of week -->
      <div class="grid grid-cols-7 gap-px bg-gray-200 border-b">
        <div
          v-for="day in daysOfWeek"
          :key="day"
          class="bg-white p-2 text-center text-sm font-medium text-gray-900"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar days -->
      <div class="grid grid-cols-7 gap-px bg-gray-200">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="[
            'bg-white min-h-[100px] p-2',
            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
            day.isToday ? 'bg-blue-50' : ''
          ]"
        >
          <div class="flex items-center justify-between">
            <span
              :class="[
                'text-sm',
                !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900',
                day.isToday ? 'font-bold' : ''
              ]"
            >
              {{ day.date.getDate() }}
            </span>
          </div>
          
          <!-- Events for this day -->
          <div class="mt-2 space-y-1">
            <div
              v-for="event in getEventsForDay(day.date)"
              :key="event.id"
              @click="openEventModal(event)"
              class="text-xs p-1 rounded cursor-pointer truncate"
              :class="getEventClass(event.type)"
            >
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event modal -->
    <div v-if="showEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md mx-auto transform transition-all">
        <h3 class="text-xl font-medium text-gray-900 mb-4 text-center">
          {{ selectedEvent ? 'Редагувати подію' : 'Нова подія' }}
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Назва</label>
            <input
              v-model="eventForm.title"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Дата</label>
            <input
              v-model="eventForm.date"
              type="date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Тип</label>
            <select
              v-model="eventForm.type"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="task">Завдання</option>
              <option value="reminder">Нагадування</option>
              <option value="appointment">Зустріч</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Опис</label>
            <textarea
              v-model="eventForm.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            ></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            v-if="selectedEvent"
            @click="deleteEvent"
            class="btn btn-danger"
          >
            Видалити
          </button>
          <button
            @click="closeEventModal"
            class="btn btn-secondary"
          >
            Скасувати
          </button>
          <button
            @click="saveEvent"
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
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const currentDate = ref(new Date())
const events = ref([])
const showEventModal = ref(false)
const selectedEvent = ref(null)
const eventForm = ref({
  title: '',
  date: '',
  type: 'task',
  description: ''
})

const daysOfWeek = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('uk-UA', { month: 'long' }).format(currentDate.value)
})

const currentYear = computed(() => {
  return currentDate.value.getFullYear()
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days = []
  
  // Add days from previous month
  const firstDayOfWeek = firstDay.getDay()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month, -i),
      isCurrentMonth: false,
      isToday: false
    })
  }
  
  // Add days from current month
  const today = new Date()
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString()
    })
  }
  
  // Add days from next month
  const remainingDays = 42 - days.length // 6 weeks * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
      isToday: false
    })
  }
  
  return days
})

onMounted(() => {
  loadEvents()
})

const loadEvents = () => {
  const savedEvents = localStorage.getItem(`calendar_events_${authStore.user?.uid}`)
  if (savedEvents) {
    events.value = JSON.parse(savedEvents).map(event => ({
      ...event,
      date: new Date(event.date)
    }))
  }
}

const saveEvents = () => {
  localStorage.setItem(`calendar_events_${authStore.user?.uid}`, JSON.stringify(events.value))
}

const getEventsForDay = (date) => {
  return events.value.filter(event => 
    event.date.toDateString() === date.toDateString()
  )
}

const getEventClass = (type) => {
  switch (type) {
    case 'task':
      return 'bg-blue-100 text-blue-800'
    case 'reminder':
      return 'bg-yellow-100 text-yellow-800'
    case 'appointment':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

const openEventModal = (event = null) => {
  selectedEvent.value = event
  if (event) {
    eventForm.value = {
      ...event,
      date: event.date.toISOString().split('T')[0]
    }
  } else {
    eventForm.value = {
      title: '',
      date: new Date().toISOString().split('T')[0],
      type: 'task',
      description: ''
    }
  }
  showEventModal.value = true
}

const closeEventModal = () => {
  showEventModal.value = false
  selectedEvent.value = null
  eventForm.value = {
    title: '',
    date: '',
    type: 'task',
    description: ''
  }
}

const saveEvent = () => {
  if (!eventForm.value.title || !eventForm.value.date) {
    alert('Будь ласка, заповніть обов\'язкові поля')
    return
  }

  const eventData = {
    ...eventForm.value,
    date: new Date(eventForm.value.date),
    id: selectedEvent.value?.id || Date.now().toString()
  }

  if (selectedEvent.value) {
    const index = events.value.findIndex(e => e.id === selectedEvent.value.id)
    events.value[index] = eventData
  } else {
    events.value.push(eventData)
  }

  saveEvents()
  closeEventModal()
}

const deleteEvent = () => {
  if (!selectedEvent.value) return
  
  if (confirm('Ви впевнені, що хочете видалити цю подію?')) {
    events.value = events.value.filter(e => e.id !== selectedEvent.value.id)
    saveEvents()
    closeEventModal()
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