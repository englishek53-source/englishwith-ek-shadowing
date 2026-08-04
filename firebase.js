import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmj2ad7_3tQ7Xvt-UhnTg10NTxW3gCl30",
  authDomain: "englishwithek-fc6cd.firebaseapp.com",
  projectId: "englishwithek-fc6cd",
  storageBucket: "englishwithek-fc6cd.firebasestorage.app",
  messagingSenderId: "658796020424",
  appId: "1:658796020424:web:ff319ed8ed1730ea009bfd"
};

// Initialize Firebase App and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Bind elements and event listeners once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userName = document.getElementById("userName");

  // Sign-in button click event
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      try {
        await signInWithPopup(auth, provider);
      } catch (e) {
        console.error("Login Error:", e);
        alert("Login failed: " + e.message);
      }
    });
  }

  // Sign-out button click event
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).catch((e) => console.error("Logout Error:", e));
    });
  }

  // Monitor auth state changes and update UI accordingly
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (loginBtn) loginBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";
      if (userName) userName.textContent = "Welcome " + (user.displayName || "User");
      
      // Update progress UI if function exists
      if (typeof updateProgressUI === "function") {
        updateProgressUI();
      }
    } else {
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (logoutBtn) logoutBtn.style.display = "none";
      if (userName) userName.textContent = "";
    }
  });
});

window.auth = auth;
