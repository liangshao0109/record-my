import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBblMvCNV9TVAAhcGV1iorcIJtn7WK3ckg",
    authDomain: "recordmy-69cec.firebaseapp.com",
    databaseURL: "https://recordmy-69cec-default-rtdb.firebaseio.com",
    projectId: "recordmy-69cec",
    storageBucket: "recordmy-69cec.appspot.com",
    messagingSenderId: "651264619524",
    appId: "1:651264619524:web:1291fe9be433489d753151",
    measurementId: "G-PWP5RM8LFN"
  };
  
const firebase = initializeApp(firebaseConfig);

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ), []);

  return [user];
};