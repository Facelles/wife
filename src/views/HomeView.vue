<template>
  <div class="space-y-8 max-w-4xl mx-auto px-4">
    <!-- Welcome Section -->
    <div class="text-center animate-slide-down">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4 hover:text-primary-600 transition-colors duration-300">
        Кицюня з зайчиком
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-300">
         Наші спільні моменти 💕
      </p>
    </div>

    <!-- Chat Section -->
    <div class="space-y-4">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Чат</h2>
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 animate-slide-up flex justify-center">
        <router-link to="/chat" class="flex items-center space-x-4 px-4 md:px-6 py-3 bg-primary-100 rounded-xl shadow hover:bg-primary-200 transition-colors">
          <span class="material-icons text-2xl md:text-3xl text-primary-500">chat</span>
          <span class="font-light text-gray-700 text-base md:text-xl">Перейти до чату</span>
        </router-link>
      </div>
    </div>

    <!-- Mood Section -->
    <div class="space-y-4">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Настрій</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up cursor-pointer hover:shadow-lg transition"
          @click="showMoodSelector = true"
        >
          <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">{{ authStore.user?.email === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня' }}</h3>
          <p class="text-4xl md:text-6xl">{{ currentMood || '😐' }}</p>
        </div>
        <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up">
          <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">{{ authStore.user?.email === 'facellesit@gmail.com' ? 'Кицюня' : 'Зайчик' }}</h3>
          <p class="text-4xl md:text-6xl">{{ partnerMood || '😐' }}</p>
        </div>
      </div>
    </div>

    <!-- Photos Section -->
    <div class="space-y-4">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Світлини</h2>
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 animate-slide-up flex justify-center">
        <router-link to="/photos" class="flex items-center space-x-4 px-4 md:px-6 py-3 bg-primary-100 rounded-xl shadow hover:bg-primary-200 transition-colors">
          <span class="material-icons text-2xl md:text-3xl text-primary-500">photo_camera</span>
          <span class="font-light text-gray-700 text-base md:text-xl">Перейти до галереї</span>
        </router-link>
      </div>
    </div>

    <!-- Sleep Section -->
    <div class="space-y-4">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Сон</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up cursor-pointer hover:shadow-lg transition"
          @click="showSleepSelector = true"
        >
          <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">{{ authStore.user?.email === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня' }}</h3>
          <p class="text-4xl md:text-6xl">{{ currentSleep || '😴' }}</p>
        </div>
        <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up">
          <h3 class="text-sm md:text-base font-light text-gray-400 mb-2">{{ authStore.user?.email === 'facellesit@gmail.com' ? 'Кицюня' : 'Зайчик' }}</h3>
          <p class="text-4xl md:text-6xl">{{ partnerSleep || '😴' }}</p>
        </div>
      </div>
    </div>

    <!-- Tasks Section -->
    <div class="space-y-4">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Завдання</h2>
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 animate-slide-up flex justify-center">
        <router-link to="/tasks" class="flex items-center space-x-4 px-4 md:px-6 py-3 bg-primary-100 rounded-xl shadow hover:bg-primary-200 transition-colors">
          <span class="material-icons text-2xl md:text-3xl text-primary-500">assignment</span>
          <span class="font-light text-gray-700 text-base md:text-xl">Перейти до завдань</span>
        </router-link>
      </div>
    </div>

    <!-- Points Section -->
    <div class="space-y-4">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Бали</h2>
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 animate-slide-up">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-center md:text-left">
            <h3 class="text-sm md:text-base font-light text-gray-400">{{ authStore.user?.email === 'facellesit@gmail.com' ? 'Зайчик' : 'Кицюня' }}</h3>
            <p class="text-3xl md:text-5xl font-bold text-primary-600">{{ points }}</p>
          </div>
          <div class="flex gap-2">
            <button
              v-for="action in actions"
              :key="action.text"
              @click="action.action"
              class="p-2 md:p-3 bg-white rounded-xl shadow hover:shadow-md transition-shadow"
            >
              <i class="material-icons text-primary-500">{{ action.icon }}</i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="space-y-4">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Статистика</h2>
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 animate-slide-up">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <!-- Mood Stats -->
          <div class="bg-white/80 rounded-xl p-4">
            <h3 class="text-sm font-medium text-gray-500 mb-2">Настрій</h3>
            <div class="flex items-center justify-between">
              <span class="text-2xl">{{ currentMood || '😐' }}</span>
              <div class="text-right">
                <div class="text-lg font-semibold text-primary-600">{{ moodPercentage }}%</div>
                <div class="text-xs text-gray-500">позитивний</div>
              </div>
            </div>
          </div>
          
          <!-- Task Stats -->
          <div class="bg-white/80 rounded-xl p-4">
            <h3 class="text-sm font-medium text-gray-500 mb-2">Завдання</h3>
            <div class="flex items-center justify-between">
              <span class="text-2xl">📝</span>
              <div class="text-right">
                <div class="text-lg font-semibold text-primary-600">{{ taskCompletionRate }}%</div>
                <div class="text-xs text-gray-500">виконано</div>
              </div>
            </div>
          </div>
          
          <!-- Points Stats -->
          <div class="bg-white/80 rounded-xl p-4">
            <h3 class="text-sm font-medium text-gray-500 mb-2">Бали</h3>
            <div class="flex items-center justify-between">
              <span class="text-2xl">⭐</span>
              <div class="text-right">
                <div class="text-lg font-semibold text-primary-600">{{ points }}</div>
                <div class="text-xs text-gray-500">загалом</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <router-link to="/stats" class="flex items-center space-x-2 px-4 py-2 bg-primary-100 rounded-xl shadow hover:bg-primary-200 transition-colors">
            <span class="material-icons text-primary-500">bar_chart</span>
            <span class="text-gray-700">Детальна статистика</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Gallery Section -->
    <div class="space-y-4">
      <h2 class="text-2xl md:text-4xl font-light text-gray-700 text-center animate-fade-in">Галерея</h2>
      <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 animate-slide-up">
        <!-- Recent Photos Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div v-for="photo in recentPhotos" :key="photo.id" class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              :src="photo.url"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              alt=""
              @click="openPhotoViewer(photo)"
            >
          </div>
          <div v-if="recentPhotos.length < 4" class="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <span class="material-icons text-4xl text-gray-400">add_photo_alternate</span>
          </div>
        </div>
        <div class="flex justify-center">
          <router-link to="/gallery" class="flex items-center space-x-2 px-4 py-2 bg-primary-100 rounded-xl shadow hover:bg-primary-200 transition-colors">
            <span class="material-icons text-primary-500">photo_library</span>
            <span class="text-gray-700">Вся галерея</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Mood Selector Modal -->
    <div v-if="showMoodSelector" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-4 md:p-6 w-full max-w-sm mx-auto transform transition-all">
        <h3 class="text-xl font-medium text-gray-900 mb-4 text-center">Виберіть настрій</h3>
        <div class="grid grid-cols-5 gap-3 mb-6">
          <button
            v-for="mood in moods"
            :key="mood.value"
            @click="selectMood(mood.emoji)"
            :class="[
              'p-3 text-3xl rounded-lg transition-colors flex items-center justify-center',
              currentMood === mood.emoji ? 'bg-primary-100 ring-2 ring-primary-500' : 'hover:bg-gray-100'
            ]"
          >
            {{ mood.emoji }}
          </button>
        </div>
        <button
          @click="showMoodSelector = false"
          class="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Скасувати
        </button>
      </div>
    </div>

    <!-- Sleep Selector Modal -->
    <div v-if="showSleepSelector" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-4 md:p-6 w-full max-w-sm mx-auto transform transition-all">
        <h3 class="text-xl font-medium text-gray-900 mb-4 text-center">Оцініть якість сну</h3>
        <div class="grid grid-cols-5 gap-3 mb-6">
          <button
            v-for="sleep in ['😴', '😌', '😑', '😫', '🥱']"
            :key="sleep"
            @click="selectSleep(sleep)"
            :class="[
              'p-3 text-3xl rounded-lg transition-colors flex items-center justify-center',
              currentSleep === sleep ? 'bg-primary-100 ring-2 ring-primary-500' : 'hover:bg-gray-100'
            ]"
          >
            {{ sleep }}
          </button>
        </div>
        <button
          @click="showSleepSelector = false"
          class="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Скасувати
        </button>
      </div>
    </div>

    <!-- Add Points Modal -->
    <div v-if="showAddPointsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md mx-auto transform transition-all">
        <h3 class="text-xl font-medium text-gray-900 mb-4 text-center">Додати бали</h3>
        <form @submit.prevent="handleAddPoints" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Кількість</label>
            <input type="number" v-model="addPointsAmount" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" min="1" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Опис</label>
            <input type="text" v-model="addPointsDescription" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" required>
          </div>
          <div class="flex justify-end space-x-3">
            <button type="button" @click="showAddPointsModal = false" class="btn btn-secondary">Скасувати</button>
            <button type="submit" class="btn btn-primary">Додати бали</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Photo Viewer -->
    <PhotoViewer
      v-if="showPhotoViewer"
      :show="showPhotoViewer"
      :photo="selectedPhoto"
      :photos="allPhotos"
      @close="showPhotoViewer = false"
      @select="handlePhotoSelect"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDevice } from '../composables/useDevice'
import { useAuthStore } from '../stores/auth'
import { listenToData, pushData, addPointsTransaction } from '../firebase/database-service'
import { useRouter } from 'vue-router'
import PhotoViewer from '../components/PhotoViewer.vue'

const { isMobile, isDesktop } = useDevice()
const authStore = useAuthStore()
const router = useRouter()

const points = ref(0)
const partnerPoints = ref(0)
const currentMood = ref(null)
const partnerMood = ref(null)
const currentSleep = ref(null)
const partnerSleep = ref(null)
const showMoodSelector = ref(false)
const showSleepSelector = ref(false)
const showAddPointsModal = ref(false)
const partnerUid = ref(null)

const myEmail = computed(() => authStore.user?.email)
const partnerEmail = computed(() =>
  myEmail.value === 'facellesit@gmail.com'
    ? 'martadaniluk4@gmail.com'
    : 'facellesit@gmail.com'
)

// Визначаємо можливі настрої
const moods = [
  { value: 'great', emoji: '😊' },
  { value: 'good', emoji: '🙂' },
  { value: 'neutral', emoji: '😐' },
  { value: 'bad', emoji: '😕' },
  { value: 'terrible', emoji: '😢' }
]

// Опції для сну
const sleepOptions = [
  { value: 'perfect', emoji: '🌟' },
  { value: 'good', emoji: '😊' },
  { value: 'normal', emoji: '😐' },
  { value: 'bad', emoji: '😫' },
  { value: 'awful', emoji: '😴' }
]

// Визначаємо стани настрою та сну
const sleepStates = {
  '😴': { value: 'great', emoji: '😴' },
  '😌': { value: 'good', emoji: '😌' },
  '😑': { value: 'neutral', emoji: '😑' },
  '😫': { value: 'bad', emoji: '😫' },
  '🥱': { value: 'terrible', emoji: '🥱' }
}

const recentPhotos = ref([])
const moodPercentage = ref(0)
const taskCompletionRate = ref(0)
const showPhotoViewer = ref(false)
const selectedPhoto = ref(null)
const allPhotos = ref([])

// Визначаємо ID партнера
const determinePartnerUid = async () => {
  try {
    const usersSnapshot = await getData('users')
    if (usersSnapshot) {
      const allUsers = Object.keys(usersSnapshot)
      partnerUid.value = allUsers.find(uid => uid !== authStore.user.uid)
    }
  } catch (error) {
    console.error('Error determining partner UID:', error)
  }
}

onMounted(async () => {
  // Визначаємо ID партнера при завантаженні
  await determinePartnerUid()

  // Підписка на бали поточного користувача
  listenToData(`points/${authStore.user.uid}`, (data) => {
    if (data) {
      points.value = data.current || 0
    }
  })

  // Підписка на бали партнера
  if (partnerUid.value) {
    listenToData(`points/${partnerUid.value}`, (data) => {
      if (data) {
        partnerPoints.value = data.current || 0
      }
    })
  }

  // Підписка на всі настрої
  listenToData('moodmain', (data) => {
    if (data) {
      // mood поточного користувача
      const myMoodArr = Object.entries(data[authStore.user.uid] || {})
        .sort((a, b) => b[1].createdAt - a[1].createdAt)
      currentMood.value = myMoodArr.length ? myMoodArr[0][1].emoji || myMoodArr[0][1].mood || null : null
      
      // mood партнера
      const partnerUid = myEmail.value === 'facellesit@gmail.com' ? Object.keys(data).find(uid => uid !== authStore.user.uid) : Object.keys(data).find(uid => uid !== authStore.user.uid)
      if (partnerUid && data[partnerUid]) {
        const partnerMoodArr = Object.entries(data[partnerUid])
          .sort((a, b) => b[1].createdAt - a[1].createdAt)
        partnerMood.value = partnerMoodArr.length ? partnerMoodArr[0][1].emoji || partnerMoodArr[0][1].mood || null : null
      } else {
        partnerMood.value = null
      }
    }
  })

  // Підписка на всі записи сну
  listenToData('sleepmain', (data) => {
    if (data) {
      // sleep поточного користувача
      const mySleepArr = Object.entries(data[authStore.user.uid] || {})
        .sort((a, b) => b[1].createdAt - a[1].createdAt)
      currentSleep.value = mySleepArr.length ? mySleepArr[0][1].emoji || mySleepArr[0][1].sleep || null : null
      // sleep партнера
      const partnerUid = myEmail.value === 'facellesit@gmail.com' ? Object.keys(data).find(uid => uid !== authStore.user.uid) : Object.keys(data).find(uid => uid !== authStore.user.uid)
      if (partnerUid && data[partnerUid]) {
        const partnerSleepArr = Object.entries(data[partnerUid])
          .sort((a, b) => b[1].createdAt - a[1].createdAt)
        partnerSleep.value = partnerSleepArr.length ? partnerSleepArr[0][1].emoji || partnerSleepArr[0][1].sleep || null : null
      } else {
        partnerSleep.value = null
      }
    }
  })

  // Завантаження всіх фотографій
  listenToData('folders', (data) => {
    if (data) {
      const photos = []
      Object.entries(data).forEach(([folderId, folder]) => {
        if (folder.photos) {
          Object.entries(folder.photos).forEach(([photoId, photo]) => {
            photos.push({
              id: photoId,
              folderId,
              ...photo
            })
          })
        }
      })
      allPhotos.value = photos.sort((a, b) => b.createdAt - a.createdAt)
      recentPhotos.value = photos.slice(0, 4)
    }
  })

  // Розрахунок статистики
  listenToData('moodmain', (data) => {
    if (data) {
      const moods = Object.values(data[authStore.user.uid] || {})
      const positiveMoods = moods.filter(mood => 
        ['great', 'good'].includes(mood.value)
      ).length
      moodPercentage.value = moods.length ? 
        Math.round((positiveMoods / moods.length) * 100) : 0
    }
  })

  listenToData('tasks', (data) => {
    if (data) {
      const tasks = Object.values(data)
      const completed = tasks.filter(task => task.status === 'completed').length
      taskCompletionRate.value = tasks.length ? 
        Math.round((completed / tasks.length) * 100) : 0
    }
  })
})

// Вибір настрою
const selectMood = async (mood) => {
  console.log('Setting mood:', mood)
  if (!authStore.user) return
  
  try {
    // Зберігаємо в moodmain
    await pushData(`moodmain/${authStore.user.uid}`, {
      value: moods.find(m => m.emoji === mood)?.value || 'neutral',
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

// Вибір якості сну
const selectSleep = async (sleep) => {
  console.log('Setting sleep:', sleep)
  if (!authStore.user) return
  
  try {
    // Зберігаємо в sleepmain
    await pushData(`sleepmain/${authStore.user.uid}`, {
      value: sleepStates[sleep].value,
      emoji: sleep,
      timestamp: Date.now(),
      userId: authStore.user.uid,
      userEmail: authStore.user.email
    })
    currentSleep.value = sleep
  } catch (error) {
    console.error('Error setting sleep:', error)
  }
}

// Дії
const actions = [
  {
    icon: 'add_circle',
    text: 'Додати бали',
    action: () => showAddPointsModal.value = true
  },
  {
    icon: 'favorite',
    text: 'Обійми',
    action: async () => {
      try {
        if (!partnerUid.value) {
          throw new Error('Партнер не знайдений')
        }

        await addPointsTransaction(
          partnerUid.value,
          200,
          'Обійми 💝',
          'hug'
        )
      } catch (error) {
        console.error('Error adding points for hug:', error)
        alert('Помилка при нарахуванні балів')
      }
    }
  },
  {
    icon: 'mood',
    text: 'Настрій',
    action: () => showMoodSelector.value = true
  },
  {
    icon: 'bedtime',
    text: 'Сон',
    action: () => showSleepSelector.value = true
  },
  {
    icon: 'assignment',
    text: 'Завдання',
    action: () => router.push('/tasks')
  },
  {
    icon: 'chat',
    text: 'Повідомлення',
    action: () => router.push('/chat')
  },
  {
    icon: 'photo_camera',
    text: 'Світлини',
    action: () => router.push('/photos')
  },
  {
    icon: 'bar_chart',
    text: 'Статистика',
    action: () => router.push('/stats')
  },
  {
    icon: 'shopping_bag',
    text: 'Магазин',
    action: () => router.push('/shop')
  }
]

const desktopFeatures = [
  { icon: 'calendar_today', text: 'Календар подій' },
  { icon: 'photo_library', text: 'Галерея фото' },
  { icon: 'playlist_add_check', text: 'Розширені завдання' },
  { icon: 'analytics', text: 'Детальна аналітика' }
]

// Оновлюємо функцію додавання балів
const addPointsAmount = ref(1)
const addPointsDescription = ref('')
const handleAddPoints = async () => {
  try {
    if (!partnerUid.value) {
      throw new Error('Партнер не знайдений')
    }

    if (points.value < addPointsAmount.value) {
      throw new Error('Недостатньо балів')
    }

    // Списуємо бали з поточного користувача
    await addPointsTransaction(
      authStore.user.uid,
      -addPointsAmount.value,
      `Передача балів: ${addPointsDescription.value}`,
      'transfer'
    )

    // Нараховуємо бали партнеру
    await addPointsTransaction(
      partnerUid.value,
      addPointsAmount.value,
      `Отримано балів: ${addPointsDescription.value}`,
      'transfer'
    )

    showAddPointsModal.value = false
    addPointsAmount.value = 1
    addPointsDescription.value = ''
  } catch (error) {
    console.error('Error transferring points:', error)
    alert(error.message || 'Помилка при передачі балів')
  }
}

// Відкриття переглядача фотографій
const openPhotoViewer = (photo) => {
  selectedPhoto.value = photo
  showPhotoViewer.value = true
}

// Обробка вибору фотографії в переглядачі
const handlePhotoSelect = (photo) => {
  selectedPhoto.value = photo
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

.animate-slide-down {
  animation: slideDown 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 