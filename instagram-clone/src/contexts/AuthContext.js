import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../lib/init-firebase';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut
} from 'firebase/auth';
import { async } from '@firebase/util';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function logout() {
         return signOut(auth).then(() => {
            // Sign-out successful
        }).catch((error) => {
            // An error happened
        });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        });

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        logout,
    }
  
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
  )
}
