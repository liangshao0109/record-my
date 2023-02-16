import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useEffect, useState, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, update} from 'firebase/database';

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
const database = getDatabase(firebase);

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

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};