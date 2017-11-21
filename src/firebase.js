import Firebase from 'firebase'
import 'firebase/firestore'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyBoyx-PQabdy8VPUHG1toe1Wozs5Jd1UQc',
  authDomain: 'louise-99469.firebaseapp.com',
  databaseURL: 'https://louise-99469.firebaseio.com',
  projectId: 'louise-99469',
  storageBucket: 'louise-99469.appspot.com',
  messagingSenderId: '470963597272'
})

export const database = firebaseApp.database()
export const firestore = firebaseApp.firestore()
export const storage = firebaseApp.storage()
