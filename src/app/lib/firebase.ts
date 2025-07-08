import { getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../../lib/firebase'

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
