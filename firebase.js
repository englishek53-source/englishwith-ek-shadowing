import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
 signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "englishwithek-fc6cd.firebaseapp.com",
  projectId: "englishwithek-fc6cd",
  storageBucket: "englishwithek-fc6cd.firebasestorage.app",
  messagingSenderId: "658796020424",
  appId: "1:658796020424:web:ff319ed8ed1730ea009bfd"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");

loginBtn.onclick = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    alert(e.message);
  }
};

logoutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    userName.textContent = "Welcome " + user.displayName;
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    userName.textContent = "";
  }
});

window.auth = auth;
