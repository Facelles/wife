import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { addSleepRecordRTDB, listenToUserSleepRecordsRTDB, updateSleepGoalsRTDB, listenToUserSleepGoalsRTDB, deleteSleepRecordRTDB } from '@/firebase/database-service'

export const useSleepStore = defineStore('sleep', () => {
  const authStore = useAuthStore()
  
  const sleepRecords = ref([])
  const partnerSleepRecords = ref([]) // Додаємо стан для записів партнера
  const sleepGoals = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  let unsubscribeRecords = null; // Для відписки від слухача записів поточного користувача
  let unsubscribeGoals = null; // Для відписки від слухача цілей
  let unsubscribePartnerRecords = null; // Для відписки від слухача записів партнера

  // Завантаження даних про сон (для поточного користувача та партнера)
  const fetchSleepData = async (partnerUid = null) => { // Приймаємо partnerUid
    if (!authStore.user) return
    
    try {
      loading.value = true
      error.value = null
      
      // Відписуємось від попередніх слухачів, якщо вони є
      if (unsubscribeRecords) unsubscribeRecords();
      if (unsubscribeGoals) unsubscribeGoals();
      if (unsubscribePartnerRecords) unsubscribePartnerRecords(); // Відписуємось від слухача партнера

      // Слухаємо записи про сон поточного користувача
      unsubscribeRecords = listenToUserSleepRecordsRTDB(authStore.user.uid, (records) => {
        sleepRecords.value = records;
        // loading.value = false; // Оновлюємо стан завантаження лише один раз після обох слухачів (або в кінці fetchSleepData)
      });

      // Слухаємо цілі сну поточного користувача
      unsubscribeGoals = listenToUserSleepGoalsRTDB(authStore.user.uid, (goals) => {
          if (goals) {
              sleepGoals.value = goals
          } else {
              // Встановлюємо стандартні цілі, якщо їх немає
              const defaultGoals = {
                  userId: authStore.user.uid,
                  minHours: 7,
                  maxHours: 9,
                  targetBedtime: '23:00',
                  targetWakeup: '07:00'
              }
              updateSleepGoalsRTDB(authStore.user.uid, defaultGoals)
              sleepGoals.value = defaultGoals; // Оновлюємо локальний стан відразу
          }
          // loading.value = false; // Оновлюємо стан завантаження лише один раз після обох слухачів (або в кінці fetchSleepData)
      })

      // Слухаємо записи про сон партнера, якщо partnerUid доступний
      if (partnerUid) {
          unsubscribePartnerRecords = listenToUserSleepRecordsRTDB(partnerUid, (records) => {
              partnerSleepRecords.value = records;
              // loading.value = false; // Оновлюємо стан завантаження лише один раз після обох слухачів (або в кінці fetchSleepData)
          });
      } else {
           partnerSleepRecords.value = []; // Очищаємо записи партнера, якщо partnerUid недоступний
      }

      // Завантаження завершено, встановлюємо loading в false
      loading.value = false;
      
    } catch (err) {
      error.value = err.message
      loading.value = false; // Встановлюємо loading в false у випадку помилки
    }
  }
  
  // Додавання запису про сон (тепер використовує Realtime Database функцію)
  const addSleepRecord = async (record) => {
    if (!authStore.user) return
    
    try {
      // loading.value = true; // loading вже встановлюється в fetchSleepData або при ініціалізації
      error.value = null
      
      const newRecord = {
        date: record.date,
        hours: record.hours,
        quality: record.quality,
        notes: record.notes || '',
        userId: authStore.user.uid,
        timestamp: Date.now() // Додаємо timestamp для сортування
      }
      
      const recordId = await addSleepRecordRTDB(authStore.user.uid, newRecord) // Використовуємо RTDB функцію
      
      // Локальний стан оновиться автоматично через listenToUserSleepRecordsRTDB
      // Можна додати оптимістичне оновлення, але поки що покладаємось на слухача
      
      return recordId
    } catch (err) {
      error.value = err.message
      // loading.value = false; // loading вже встановлюється в listenToUserSleepRecordsRTDB
      return null
    } /* finally { // Видаляємо finally блок
      loading.value = false
    } */
  }
  
  // Оновлення цілей сну (тепер використовує Realtime Database функцію)
  const updateSleepGoals = async (goals) => {
    if (!authStore.user) return
    
    try {
      // loading.value = true; // loading вже встановлюється в fetchSleepData або при ініціалізації
      error.value = null
      
      const updates = {
        minHours: goals.minHours,
        maxHours: goals.maxHours,
        targetBedtime: goals.targetBedtime,
        targetWakeup: goals.targetWakeup
      }
      
      // Оновлюємо цілі в Firebase (RTDB)
      await updateSleepGoalsRTDB(authStore.user.uid, updates) // Використовуємо RTDB функцію
      
      // Локальний стан оновиться автоматично через listenToUserSleepGoalsRTDB
      // Можна додати оптимістичне оновлення, але поки що покладаємось на слухача

      return true
    } catch (err) {
      error.value = err.message
      // loading.value = false; // loading вже встановлюється в listenToUserSleepGoalsRTDB
      return false
    } /* finally { // Видаляємо finally блок
      loading.value = false
    } */
  }
  
  // Видалення запису про сон (тепер використовує Realtime Database функцію)
  const deleteSleepRecord = async (recordId) => {
    if (!authStore.user) return
    
    try {
      // loading.value = true; // loading вже встановлюється в fetchSleepData або при ініціалізації
      error.value = null
      
      // Видаляємо запис в Firebase (RTDB)
      await deleteSleepRecordRTDB(authStore.user.uid, recordId) // Використовуємо RTDB функцію
      
      // Локальний стан оновиться автоматично через listenToUserSleepRecordsRTDB
      
      return true
    } catch (err) {
      error.value = err.message
      // loading.value = false; // loading вже встановлюється в listenToUserSleepRecordsRTDB
      return false
    } /* finally { // Видаляємо finally блок
      loading.value = false
    } */
  }
  
  // Обчислені властивості
  
  // Середня кількість годин сну
  const averageSleepHours = computed(() => {
    if (sleepRecords.value.length === 0) return 0
    
    const totalHours = sleepRecords.value.reduce((sum, record) => sum + (record.hours || 0), 0) // Додаємо перевірку на наявність hours
    return Math.round((totalHours / sleepRecords.value.length) * 10) / 10
  })
  
  // Середня якість сну
  const averageSleepQuality = computed(() => {
    if (sleepRecords.value.length === 0) return 0
    
    const totalQuality = sleepRecords.value.reduce((sum, record) => sum + (record.quality || 0), 0) // Додаємо перевірку на наявність quality
    return Math.round((totalQuality / sleepRecords.value.length) * 10) / 10
  })
  
  // Запис сну на сьогодні
  const todaySleepRecord = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    // Порівнюємо дати у форматі YYYY-MM-DD
    return sleepRecords.value.find(record => record.date === today) || null
  })
  
  // Записи сну за останні 7 днів
  const lastWeekSleepRecords = computed(() => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    // В Realtime Database timestamp зберігається як число, порівнюємо його
    const sevenDaysAgoTimestamp = sevenDaysAgo.getTime();

    return sleepRecords.value
      .filter(record => record.timestamp && record.timestamp >= sevenDaysAgoTimestamp) // Фільтруємо за timestamp
      .sort((a, b) => b.timestamp - a.timestamp) // Сортуємо за timestamp
  })

  // Додаємо функцію для вивантаження даних при розмонтуванні компонента
  const unsubscribeFromSleepData = () => {
    if (unsubscribeRecords) unsubscribeRecords();
    if (unsubscribeGoals) unsubscribeGoals();
    if (unsubscribePartnerRecords) unsubscribePartnerRecords();
  };
  
  return {
    sleepRecords,
    partnerSleepRecords,
    sleepGoals,
    loading,
    error,
    averageSleepHours,
    averageSleepQuality,
    todaySleepRecord,
    lastWeekSleepRecords,
    fetchSleepData,
    addSleepRecord,
    updateSleepGoals,
    deleteSleepRecord,
    unsubscribeFromSleepData // Експортуємо функцію відписки
  }
}) 