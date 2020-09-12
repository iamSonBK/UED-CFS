import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB0ihoATqEPTMxjZq--nsjvTxi2i8KRkPA",
  authDomain: "spdn-cfs.firebaseapp.com",
  databaseURL: "https://spdn-cfs.firebaseio.com",
  projectId: "spdn-cfs",
  storageBucket: "spdn-cfs.appspot.com",
  messagingSenderId: "922442795082",
  appId: "1:922442795082:web:dd6ca7e1d6154f38c47eb3",
  measurementId: "G-JBZGT0T5BS",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
