import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '../app/lib/firebaseConfig'

// Optional runtime check to help during local development
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.warn('Firebase credentials are missing. Did you forget to set up .env.local?')
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
