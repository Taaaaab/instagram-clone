// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC93mezpo40oufWrDigbkwJy9GmEgAugAA",
  authDomain: "instagram-clone-a8f60.firebaseapp.com",
  projectId: "instagram-clone-a8f60",
  storageBucket: "instagram-clone-a8f60.appspot.com",
  messagingSenderId: "182656384826",
  appId: "1:182656384826:web:bbe7a42dceb6259149da03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;