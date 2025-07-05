// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBQ0P29rQiLrQS00LVnOxt8Z5JbWqPM0Ms",
  authDomain: "app-apr01.firebaseapp.com",
  projectId: "app-apr01",
  storageBucket: "app-apr01.appspot.com", // Corrigido aqui
  messagingSenderId: "1015467798632",
  appId: "1:1015467798632:web:4724ee257d51553b788bdd",
  measurementId: "G-3DRLGQDK0E"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa serviços
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
