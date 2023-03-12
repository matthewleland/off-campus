import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRsWy0ZYaJCyYukCDiG2IhMxQ8I8vrCSo',
  authDomain: 'off-campus-93d6f.firebaseapp.com',
  projectId: 'off-campus-93d6f',
  storageBucket: 'off-campus-93d6f.appspot.com',
  messagingSenderId: '1053085521499',
  appId: '1:1053085521499:web:58c5a2d16d56f998f6517e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)
export const db = getFirestore()
