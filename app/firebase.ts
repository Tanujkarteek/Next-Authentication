import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlcON7BjKGq6c3K6NSokeWq1zrxJwBZZE",
  authDomain: "dss-lab.firebaseapp.com",
  projectId: "dss-lab",
  storageBucket: "dss-lab.appspot.com",
  messagingSenderId: "297110872459",
  appId: "1:297110872459:web:6a344d877d3c48f68c8f8e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
