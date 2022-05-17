// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import {
    getAuth,
    connectAuthEmulator,
    signInWithEmailAndPassword
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYX72UFIZIwUHXVGLw7psxAnSixpIlqHg",
    authDomain: "kuehlfrank-16459.firebaseapp.com",
    projectId: "kuehlfrank-16459",
    storageBucket: "kuehlfrank-16459.appspot.com",
    messagingSenderId: "836415633281",
    appId: "1:836415633281:web:0e7538d70ab8af85a2da80",
    measurementId: "G-3BXWGT66J4"
};

