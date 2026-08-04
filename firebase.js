import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmj2ad7_3tQ7Xvt-UhnTg10NTxW3gCl30",
  authDomain: "englishwithek-fc6cd.firebaseapp.com",
  projectId: "englishwithek-fc6cd",
  storageBucket: "englishwithek-fc6cd.firebasestorage.app",
  messagingSenderId: "658796020424",
  appId: "1:658796020424:web:ff319ed8ed1730ea009bfd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
