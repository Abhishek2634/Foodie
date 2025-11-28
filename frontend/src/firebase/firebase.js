import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "your api key",
    authDomain: "your auth domain",
    projectId: "your project id",
    storageBucket: "your storage bucket",
    messagingSenderId: "your messaging sender id",
    appId: "your app id"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;


