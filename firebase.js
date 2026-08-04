import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
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

// Handle authentication redirect result
getRedirectResult(auth)
  .then((result) => {
    if (result && result.user) {
      console.log("Logged in successfully:", result.user);
    }
  })
  .catch((error) => {
    console.error("Redirect Login Error:", error);
  });

// Setup UI elements and authentication listeners
function setupAuthUI() {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userName = document.getElementById("userName");

  // Sign-in button click event
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      signInWithRedirect(auth, provider);
    });
  }

  // Sign-out button click event
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).catch((error) => console.error("Logout Error:", error));
    });
  }

  // Monitor auth state changes
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
}

// Execute setup once DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupAuthUI);
} else {
  setupAuthUI();
}

window.auth = auth;
