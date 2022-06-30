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

import { getDatabase, connectDatabaseEmulator, ref, child, get, onValue } from "firebase/database";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDYX72UFIZIwUHXVGLw7psxAnSixpIlqHg",
  authDomain: "kuehlfrank-16459.firebaseapp.com",
  databaseURL: "https://kuehlfrank-16459-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kuehlfrank-16459",
  storageBucket: "kuehlfrank-16459.appspot.com",
  messagingSenderId: "836415633281",
  appId: "1:836415633281:web:0e7538d70ab8af85a2da80",
  measurementId: "G-3BXWGT66J4"
};

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

// Log out
const logout = async () => {
  await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword)
btnSignup.addEventListener("click", createAccount)
btnLogout.addEventListener("click", logout)

const auth = getAuth(firebaseApp);

const database = getDatabase(firebaseApp);

// const dbRef = ref(getDatabase(firebaseApp));
// get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });




// inDatenbankSchreiben();


if (location.hostname === "localhost") {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(database, "localhost", 9000);
}

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
firebase.initializeApp(firebaseConfig);

export function inDatenbankSchreiben() {
  try {

    // Add data
    let obj = {
      name: "TF3",
      age: 25,
    };
    firebase.database().ref("users/user2").set(obj);

    // // read data
    firebase
      .database()
      .ref("users/user2")
      .on("value", (sanpshot) => {
        console.log(sanpshot.val());
      });

    // update data
    // let newupdateddata = {
    //     name: "TF0",
    // };
    // firebase.database().ref("users/user3").update(newupdateddata);
    // remove data
    // firebase.database().ref("users/user3").remove();
  } catch (error) {
    console.error("Datenbankabfrage Fehlgeschlagen!!!");
  }
}

// export var cloudNamen = 'w';
export function namenAusDatenbankLesen() {
  try {
    // firebase.initializeApp(firebaseConfig);

    // read data
    firebase.database()
      .ref('cloudNamenList')
      .on('value', (sanpshot) => {
        // console.log(sanpshot.val())
        var cloudNamen = sanpshot.val();
        // console.log(cloudNamen);
      })

  } catch (error) {
    console.error("Datenbankabfrage Fehlgeschlagen!!!");
  }
  // console.log(cloudNamen);
  return cloudNamen;
}

export var out;

export function namenAusDatenbankLesen2() {

  // const dbRef = ref(getDatabase());
  // get(child(dbRef, `cloudNamenList`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //     cloudNamen = snapshot.val();

  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });




  // try {
  //   // firebase.initializeApp(firebaseConfig);


  //   return new Promise(resolve => {
  //     // read data
  //     firebase.database()
  //       .ref('cloudNamenList')
  //       .on('value', (sanpshot) => {
  //         // console.log(sanpshot.val())
  //         var cloudNamen = sanpshot.val();
  //         // console.log(cloudNamen);
  //         // out = cloudNamen;
  //         // console.log(out);
  //         console.log('read');
  //         out = cloudNamen;
  //         // console.log(cloudNamen);
  //         // console.log('read danach');
  //       })
  //   });
  // } catch (error) {
  //   console.error("Datenbankabfrage Fehlgeschlagen!!!");
  // }

  // namenAusDatenbankLesen2().then(console.log)

}


// console.log(out);

// export const getHttpFake = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       firebase.database()
//         .ref('cloudNamenList')
//         .on('value', (sanpshot) => {
//           var cloudNamen = sanpshot.val();
//           // console.log('read');
//           // console.log(cloudNamen);
//         })
//     }, 0);
//   });
// }
// // getHttpFake().then(console.log);

// const getHttpFake2 = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       firebase.database()
//         .ref('cloudNamenList')
//         .on('value', (sanpshot) => {
//           var cloudNamen = sanpshot.val();
//           console.log('read');
//           console.log(cloudNamen);
//         })
//     }, 0);
//   });
// }
// // getHttpFake2().then(console.log);

// const getHttpFake3 = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('name');
//     }, 0);
//   });
// }
// getHttpFake3(2).then(console.log);

// const getHttpFake4 = () => {
//   return new Promise(resolve => {
//     resolve('name2');
//   });
// }
// getHttpFake4(2).then(console.log);

// const dataB = () => {
//   // namenAusDatenbankLesen2();
//   return new Promise(resolve => {
//     firebase.database()
//       .ref('cloudNamenList')
//       .on('value', (sanpshot) => {
//         // var cloudNamen = sanpshot.val();
//       })
//   });
// }
// console.log(dataB());
// dataB().then(console.log);
// var a = dataB().then;
// console.log(a);
// // const getHttpFake5 = () => {
// //   return new Promise(resolve => {
// //     resolve(dataB());
// //   });
// // }
// // getHttpFake5().then(console.log);

// const printAllAsyncAwait = async () => {
//   await console.log(namenAusDatenbankLesen2());
//   await console.log("Leute");
//   await console.log("was geht ab?");
// }
// printAllAsyncAwait();

// // import { getDatabase, ref, child, get } from "firebase/database";

// const dbRef = ref(getDatabase());
// get(child(dbRef, cloudNamenList)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.log(error);
// });


// const getData = () => {
//   firebase.database()
//     .ref('cloudNamenList')
//     .on('value', (sanpshot) => {
//       // var cloudNamen = sanpshot.val();
//       // console.log(sanpshot.val());
//     })
// }
// getData();
// // console.log(getData().then());


