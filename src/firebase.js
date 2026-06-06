// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDHmDkXnkQBPauw9RI9sP1EwBnVSI_DxZk',
  authDomain: 'hijama-7cb52.firebaseapp.com',
  projectId: 'hijama-7cb52',
  storageBucket: 'hijama-7cb52.firebasestorage.app',
  messagingSenderId: '216500412161',
  appId: '1:216500412161:web:6d2047560b830b13d64500',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
