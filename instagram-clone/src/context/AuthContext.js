import {
  createContext, useContext, useEffect, useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase-config';

const UserContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const createUser = async (email, password, userName) => {
    // return createUserWithEmailAndPassword(auth, email, password)
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, {
      displayName: userName,
    });
  };

  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const passwordReset = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{
      createUser, user, signIn, logout, passwordReset,
    }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const UserAuth = () => useContext(UserContext);
