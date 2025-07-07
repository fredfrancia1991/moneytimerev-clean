// lib/firebase.ts

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBhWodzmFDY8REV73qt9wOxSDxxFfdcMTI",
  authDomain: "moneytimerev-e2351.firebaseapp.com",
  projectId: "moneytimerev-e2351",
  storageBucket: "moneytimerev-e2351.appspot.com",
  messagingSenderId: "428598409137",
  appId: "1:428598409137:web:a3e604f079396d84632f90"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
