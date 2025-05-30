import { ref as dbRef, onValue, set, update, remove, push, child, get } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { database, storage } from './index'
import { auth } from './index'

// Отримання даних у реальному часі
export const listenToData = (path, callback) => {
  const dataRef = dbRef(database, path)
  const unsubscribe = onValue(dataRef, (snapshot) => {
    const data = snapshot.val()
    callback(data)
  })
  
  return unsubscribe
}

// Отримання даних один раз
export const getData = async (path) => {
  try {
    const snapshot = await get(dbRef(database, path))
    return snapshot.val()
  } catch (error) {
    console.error('Error getting data:', error)
    throw error
  }
}

// Запис даних
export const writeData = async (path, data) => {
  try {
    await set(dbRef(database, path), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return true
  } catch (error) {
    console.error('Error writing data:', error)
    throw error
  }
}

// Оновлення даних
export const updateData = async (path, data) => {
  try {
    await update(dbRef(database, path), {
      ...data,
      updatedAt: new Date().toISOString()
    })
    return true
  } catch (error) {
    console.error('Error updating data:', error)
    throw error
  }
}

// Видалення даних
export const removeData = async (path) => {
  try {
    await remove(dbRef(database, path))
    return true
  } catch (error) {
    console.error('Error removing data:', error)
    throw error
  }
}

// Додавання даних з автоматичним ID
export const pushData = async (path, data) => {
  try {
    console.log('Pushing data to path:', path, 'with data:', data)
    const newRef = push(dbRef(database, path))
    const dataToSave = {
      ...data,
      id: newRef.key,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    console.log('Saving data:', dataToSave)
    await set(newRef, dataToSave)
    console.log('Data saved successfully')
    return newRef.key
  } catch (error) {
    console.error('Error pushing data:', error)
    throw error
  }
}

// Отримання даних користувача
export const getUserData = async (userId) => {
  try {
    const snapshot = await get(dbRef(database, `users/${userId}`))
    return snapshot.val()
  } catch (error) {
    console.error('Error getting user data:', error)
    throw error
  }
}

// Оновлення даних користувача
export const updateUserData = async (userId, data) => {
  try {
    await update(dbRef(database, `users/${userId}`), {
      ...data,
      updatedAt: new Date().toISOString()
    })
    return true
  } catch (error) {
    console.error('Error updating user data:', error)
    throw error
  }
}

// Отримання повідомлень
export const getMessages = async (limit = 50) => {
  try {
    const messagesRef = dbRef(database, 'messages')
    const snapshot = await get(messagesRef)
    const messages = []
    
    snapshot.forEach((childSnapshot) => {
      messages.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      })
    })
    
    return messages.slice(-limit)
  } catch (error) {
    console.error('Error getting messages:', error)
    throw error
  }
}

// Відправка повідомлення
export const sendMessage = async (userId, content) => {
  try {
    const newMessageRef = push(dbRef(database, 'messages'))
    await set(newMessageRef, {
      userId,
      content,
      createdAt: new Date().toISOString(),
      id: newMessageRef.key
    })
    return newMessageRef.key
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

// Функція для видалення даних
export const deleteData = async (path) => {
  const dataRef = dbRef(database, path)
  await remove(dataRef)
}

export const addPointsTransaction = async (userId, amount, reason, type = 'reward') => {
  try {
    // Отримуємо поточні бали користувача
    const pointsRef = dbRef(database, `points/${userId}`)
    const pointsSnapshot = await get(pointsRef)
    const currentPoints = pointsSnapshot.exists() ? pointsSnapshot.val().current || 0 : 0

    // Оновлюємо бали
    await update(pointsRef, {
      current: currentPoints + amount,
      updatedAt: Date.now(),
      userId,
      userEmail: auth.currentUser.email
    })

    // Додаємо транзакцію
    await push(dbRef(database, 'points_transactions'), {
      amount,
      reason,
      timestamp: Date.now(),
      userId,
      userEmail: auth.currentUser.email,
      type
    })

    return true
  } catch (error) {
    console.error('Error adding points transaction:', error)
    throw error
  }
}

export const uploadFile = async (file, path) => {
  try {
    const fileRef = storageRef(storage, path)
    await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(fileRef)
    return downloadURL
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

// Функція для ініціалізації початкових балів користувача
export const initializeUserPoints = async (userId) => {
  try {
    const pointsRef = dbRef(database, `points/${userId}`)
    const snapshot = await get(pointsRef)
    
    if (!snapshot.exists()) {
      await set(pointsRef, {
        current: 0,
        lastUpdated: Date.now()
      })
    }
  } catch (error) {
    console.error('Error initializing user points:', error)
    throw error
  }
}

// Функція для оновлення балів користувача
export const updateUserPoints = async (userId, amount) => {
  try {
    const pointsRef = dbRef(database, `points/${userId}`)
    const snapshot = await get(pointsRef)
    
    if (!snapshot.exists()) {
      await initializeUserPoints(userId)
    }
    
    const currentPoints = snapshot.val()?.current || 0
    const newPoints = currentPoints + amount
    
    await set(pointsRef, {
      current: newPoints,
      lastUpdated: Date.now()
    })
    
    return newPoints
  } catch (error) {
    console.error('Error updating user points:', error)
    throw error
  }
}

// Функція для додавання запису сну
export const addSleepRecordRTDB = async (userId, record) => {
  try {
    const newRecordRef = push(dbRef(database, `sleepmain/${userId}`));
    const recordToSave = {
      ...record,
      id: newRecordRef.key,
      userId: userId,
      timestamp: Date.now(),
      createdAt: Date.now(), // Додаємо createdAt
      updatedAt: Date.now(), // Додаємо updatedAt
    };
    await set(newRecordRef, recordToSave);
    return newRecordRef.key;
  } catch (error) {
    console.error('Error adding sleep record to RTDB:', error);
    throw error;
  }
};

// Функція для отримання записів сну для користувача
// Realtime Database має обмежені можливості фільтрації/сортування порівняно з Firestore.
// Для простих випадків, як тут (отримання всіх записів для користувача), можна слухати вузол.
export const listenToUserSleepRecordsRTDB = (userId, callback) => {
  if (!userId) {
    console.warn('listenToUserSleepRecordsRTDB: userId is null or undefined.');
    return () => {}; // Повертаємо порожню функцію для відписки
  }
  const recordsRef = dbRef(database, `sleepmain/${userId}`);
  const unsubscribe = onValue(recordsRef, (snapshot) => {
    const data = snapshot.val();
    const records = data ? Object.values(data).sort((a, b) => b.timestamp - a.timestamp) : [];
    callback(records);
  });
  return unsubscribe;
};

// Функція для оновлення/створення цілей сну для користувача
export const updateSleepGoalsRTDB = async (userId, goals) => {
  try {
    const goalsRef = dbRef(database, `sleepmainGoals/${userId}`);
    await set(goalsRef, {
      ...goals,
      userId: userId,
      updatedAt: Date.now(), // Додаємо updatedAt
    });
    return true;
  } catch (error) {
    console.error('Error updating sleep goals in RTDB:', error);
    throw error;
  }
};

// Функція для отримання цілей сну для користувача
export const listenToUserSleepGoalsRTDB = (userId, callback) => {
    if (!userId) {
        console.warn('listenToUserSleepGoalsRTDB: userId is null or undefined.');
        return () => {};
    }
    const goalsRef = dbRef(database, `sleepmainGoals/${userId}`);
    const unsubscribe = onValue(goalsRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
    return unsubscribe;
};

// Функція для видалення запису сну
export const deleteSleepRecordRTDB = async (userId, recordId) => {
  try {
    const recordRef = dbRef(database, `sleepmain/${userId}/${recordId}`);
    await remove(recordRef);
    return true;
  } catch (error) {
    console.error('Error deleting sleep record from RTDB:', error);
    throw error;
  }
}; 