import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7A1gnlWJFHeMjsmDxP-FXGI74ZwvNP68",
  authDomain: "cooking-ninja-site-8b378.firebaseapp.com",
  projectId: "cooking-ninja-site-8b378",
  storageBucket: "cooking-ninja-site-8b378.appspot.com",
  messagingSenderId: "29025153292",
  appId: "1:29025153292:web:76e740a3137d5d805cd929",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
