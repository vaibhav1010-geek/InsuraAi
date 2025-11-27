import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrYEnm72x2V1ZgO07E91VF7q7UAllBAkU",
  authDomain: "insuraai-6a403.firebaseapp.com",
  projectId: "insuraai-6a403",
  storageBucket: "insuraai-6a403.firebasestorage.app",
  messagingSenderId: "110779280842",
  appId: "1:110779280842:web:b499d3c54c67467c037333",
  measurementId: "G-M9XL14Q7N7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);