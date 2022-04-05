import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBaCdm99iV5tW8-sEjo87gM6uXKpjSX7PE",
  authDomain: "reservetest-1dc20.firebaseapp.com",
  projectId: "reservetest-1dc20",
  storageBucket: "reservetest-1dc20.appspot.com",
  messagingSenderId: "976831142070",
  appId: "1:976831142070:web:4bbc0a2579b821d2976e17",
  measurementId: "G-5H22JLBCT5"
   
  };
export const fire = firebase.initializeApp(firebaseConfig);
export const firestorage= firebase.storage()
export const firestore = firebase.firestore();




