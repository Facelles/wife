import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const storage = getStorage()

// Завантаження файлу в Firebase Storage
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

// Видалення файлу з Firebase Storage
export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
} 