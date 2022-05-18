// Import the functions you need from the SDKs you need
console.error('sdgsgd');
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDYX72UFIZIwUHXVGLw7psxAnSixpIlqHg",
    authDomain: "kuehlfrank-16459.firebaseapp.com",
    projectId: "kuehlfrank-16459",
    storageBucket: "kuehlfrank-16459.appspot.com",
    messagingSenderId: "836415633281",
    appId: "1:836415633281:web:0e7538d70ab8af85a2da80",
    measurementId: "G-3BXWGT66J4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const auth = getAuth(firebaseConfig);

// import {
//     getAuth,
//     connectAuthEmulator,
//     signInWithEmailAndPassword
// } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
// import { async } from "@firebase/util";




// const loginEmailPassword = async () => {
//     const loginEmail = txtEmail.value;
//     const loginPassword = txtPassword.value;

//     const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
//     console.log(userCredential.user);
// }

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

btnLogin.addEventListener("click", loginEmailPassword);