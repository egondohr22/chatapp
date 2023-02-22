import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAMGM2rHwHE80IwuXggae74FrF3LMQO3YU",
  authDomain: "chatapp-3ed94.firebaseapp.com",
  projectId: "chatapp-3ed94",
  storageBucket: "chatapp-3ed94.appspot.com",
  messagingSenderId: "39497202558",
  appId: "1:39497202558:web:8097e1303536d93d54912f",
  measurementId: "G-T5T4ZK61S4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);