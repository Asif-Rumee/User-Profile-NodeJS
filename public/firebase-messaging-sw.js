importScripts("https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyCUuMai2v1A4Zh3VKmPRy9ixmONniSvJSI",
  authDomain: "user-profile-7fdff.firebaseapp.com",
  projectId: "user-profile-7fdff",
  storageBucket: "user-profile-7fdff.appspot.com",
  messagingSenderId: "971821456885",
  appId: "1:971821456885:web:757534d81002493db0d4bc",
  measurementId: "G-JHNDBC2M0Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
