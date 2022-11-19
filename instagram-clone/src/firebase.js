import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC93mezpo40oufWrDigbkwJy9GmEgAugAA",
  authDomain: "instagram-clone-a8f60.firebaseapp.com",
  projectId: "instagram-clone-a8f60",
  storageBucket: "instagram-clone-a8f60.appspot.com",
  messagingSenderId: "182656384826",
  appId: "1:182656384826:web:bbe7a42dceb6259149da03"
});

export const auth = getAuth(firebaseApp);
export default firebaseApp;