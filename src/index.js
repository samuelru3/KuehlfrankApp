import './styles.css';
import {
  hideLoginError,
  showLoginState,
  showLoginForm,
  showApp,
  showLoginError,
  btnLogin,
  btnSignup,
  btnLogout,
  hideLoginForm
} from './ui'

import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDYX72UFIZIwUHXVGLw7psxAnSixpIlqHg",
  authDomain: "kuehlfrank-16459.firebaseapp.com",
  databaseURL: "https://kuehlfrank-16459-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kuehlfrank-16459",
  storageBucket: "kuehlfrank-16459.appspot.com",
  messagingSenderId: "836415633281",
  appId: "1:836415633281:web:0e7538d70ab8af85a2da80",
  measurementId: "G-3BXWGT66J4"
});

// const analytics = getAnalytics(app);

// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value

  // step 1: try doing this w/o error handling, and then add try/ckatch
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

  // step 2: add error handling
  // try {
  //   await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  // }
  // catch(error) {
  //   console.log(`There was an error: ${error}`)
  //   showLoginError(error)
  // }
}

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value

  try {
    await createUserWithEmailAndPassword(auth, email, password)
  }
  catch (error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  }
}

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      console.log('Halloooooo');
      showApp()
      showLoginState(user)

      hideLoginError()
      hideLinkError()
    }
    else {
      showLoginForm()
      lblAuthState.innerHTML = `You're not logged in.`
    }
  })
}



//      DATABASE{

import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase('cloudNamenList'));
dbRef.on('value', snpachot => {
  console.log(snpachot.val());
  console.log('versucht');
})

// get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });


// const database = firebase.database();
// const rootRef = database.ref('cloudNamenList');

// rootRef.orderByKey().on('value', snpachot => {
//   console.log(snpachot.val());
//   console.log('versucht');
// })


//      } DATABASE


// Log out
const logout = async () => {
  await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword)
btnSignup.addEventListener("click", createAccount)
btnData.addEventListener("click", dbRef)
btnLogout.addEventListener("click", logout)

const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, "http://localhost:9099");

const hideAuthState = async () => {
  onAuthStateChanged(auth, user => {
    const monitorAuthState = async () => {
      onAuthStateChanged(auth, user => {
        hideLoginForm()
      })
    }
  })
}
hideLoginForm();







// import { getDatabase, ref, child, get } from "firebase/database";

// const dbRef = ref(getDatabase());
// get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });