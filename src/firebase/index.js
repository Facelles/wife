import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
}

// Backblaze B2 конфігурація
const b2Config = {
  accountId: import.meta.env.VITE_B2_ACCOUNT_ID,
  applicationKey: import.meta.env.VITE_B2_APPLICATION_KEY,
  bucketName: import.meta.env.VITE_B2_BUCKET_NAME,
  bucketId: import.meta.env.VITE_B2_BUCKET_ID
}

// Cloudflare конфігурація
const cloudflareConfig = {
  zoneId: import.meta.env.VITE_CLOUDFLARE_ZONE_ID,
  apiToken: import.meta.env.VITE_CLOUDFLARE_API_TOKEN,
  domain: import.meta.env.VITE_CLOUDFLARE_DOMAIN
}

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const database = getDatabase(app)
const storage = getStorage(app)

export { 
  app, 
  auth, 
  db, 
  database, 
  storage,
  b2Config,
  cloudflareConfig
} 
 