import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAtUmE5pCcYdYTUftSAY1a2tAWuCJgyFik",
    authDomain: "information-a0f23.firebaseapp.com",
    projectId: "information-a0f23",
    storageBucket: "information-a0f23.appspot.com",
    messagingSenderId: "888262992494",
    appId: "1:888262992494:web:8bfe93d1e3b02e7dd53c7f",
    measurementId: "G-P8PWNN2JJ1"
  };

  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);
