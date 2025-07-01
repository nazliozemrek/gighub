
import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCXKijUwuXXMDRwzHIiGuGydOhoNYs2GmU",
  authDomain: "gighub-f8b47.firebaseapp.com",
  projectId: "gighub-f8b47",
  storageBucket: "gighub-f8b47.appspot.com",
  messagingSenderId: "29982744660",
  appId: "1:29982744660:web:f22e691c342be870a84dc1",
  measurementId: "G-9YSJY0BVVB"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);