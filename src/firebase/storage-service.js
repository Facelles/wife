import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage, b2Config, cloudflareConfig } from './index'

// Функція для отримання URL файлу через Cloudflare
const getCloudflareUrl = (path) => {
  return `https://${cloudflareConfig.domain}/${path}`
}

// Функція для завантаження файлу
export const uploadFile = async (file, path) => {
  try {
    // Створюємо посилання на файл
    const storageRef = ref(storage, `${path}/${file.name}`)
    
    // Завантажуємо файл
    const snapshot = await uploadBytes(storageRef, file)
    
    // Отримуємо URL для доступу до файлу через Cloudflare
    const downloadURL = getCloudflareUrl(snapshot.ref.fullPath)
    
    return {
      url: downloadURL,
      path: snapshot.ref.fullPath,
      name: file.name,
      type: file.type,
      size: file.size,
      b2Bucket: b2Config.bucketName,
      cloudflareDomain: cloudflareConfig.domain
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

// Функція для видалення файлу
export const deleteFile = async (path) => {
  try {
    const fileRef = ref(storage, path)
    await deleteObject(fileRef)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

// Функція для отримання URL файлу
export const getFileUrl = async (path) => {
  try {
    return getCloudflareUrl(path)
  } catch (error) {
    console.error('Error getting file URL:', error)
    throw error
  }
}

// Функція для перевірки типу файлу
export const validateFile = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4']) => {
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Непідтримуваний тип файлу')
  }
  
  // Максимальний розмір файлу (5GB)
  const maxSize = 5 * 1024 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error('Файл занадто великий')
  }
  
  return true
} 