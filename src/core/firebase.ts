// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtmIX5AQfqcdPO-gOEkUQJm51llQhcrZE",
  authDomain: "naqra-app.firebaseapp.com",
  projectId: "naqra-app",
  storageBucket: "naqra-app.firebasestorage.app",
  messagingSenderId: "625210461180",
  appId: "1:625210461180:web:1395fbb7bf77181a998079",
  measurementId: "G-TNN6W537M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);