import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit, 
  Timestamp, 
  arrayUnion, 
  arrayRemove 
} from 'firebase/firestore'
import { db } from './index'

// Додавання документа в колекцію
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = doc(collection(db, collectionName))
    const documentData = {
      ...data,
      id: docRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
    
    await setDoc(docRef, documentData)
    return docRef.id
  } catch (error) {
    console.error('Error adding document:', error)
    throw error
  }
}

// Отримання документа за ID
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error getting document:', error)
    throw error
  }
}

// Оновлення документа
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    })
    return true
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}

// Видалення документа
export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId))
    return true
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

// Отримання документів з фільтрацією
export const getDocuments = async (collectionName, conditions = [], orderByField = 'createdAt', orderDirection = 'desc', limitCount = 100) => {
  try {
    const constraints = []
    
    // Додаємо умови фільтрації
    conditions.forEach(condition => {
      constraints.push(where(condition.field, condition.operator, condition.value))
    })
    
    // Додаємо сортування та обмеження кількості
    constraints.push(orderBy(orderByField, orderDirection))
    if (limitCount) {
      constraints.push(limit(limitCount))
    }
    
    const q = query(collection(db, collectionName), ...constraints)
    const querySnapshot = await getDocs(q)
    
    const documents = []
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() })
    })
    
    return documents
  } catch (error) {
    console.error('Error getting documents:', error)
    throw error
  }
} 