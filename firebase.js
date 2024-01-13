
// import firebase from 'firebase/compat';
import * as firebase from 'firebase/app'
// import {firebase, getApps} from 'firebase/app'; 
import 'firebase/auth';
import { initializeApp } from 'firebase/app';

import { getFirestore } from "firebase/firestore"
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, connectToDatabase} from "firebase/firestore";

// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)      
// });


const firebaseConfig = {
  apiKey: "AIzaSyAxbTWU2vNzzqnsdHJjQM2OKvmY5gD82pM",
  authDomain: "rn-instagram-clone-ddf3e.firebaseapp.com",
  projectId: "rn-instagram-clone-ddf3e",
  storageBucket: "rn-instagram-clone-ddf3e.appspot.com",
  messagingSenderId: "67036392306",
  appId: "1:67036392306:web:c335160a689be2e3d14beb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
const auth = getAuth(app);
const db = getFirestore(app);
// console.log(auth)
// const db = await connectToDatabase();

// !firebase.Apps().length ? initializeApp(firebaseConfig) : firebase.app();

export  {auth, db};