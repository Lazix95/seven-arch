// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
export type { User } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDEh6oBqcdHQ-LB5fLKpHvvhO8M6P-GFxY',
  authDomain: 'cv-app-28733.firebaseapp.com',
  projectId: 'cv-app-28733',
  storageBucket: 'cv-app-28733.appspot.com',
  messagingSenderId: '270691133858',
  appId: '1:270691133858:web:18eb81dbd28763fb62aafb',
  measurementId: 'G-QRQ098R6BQ',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
