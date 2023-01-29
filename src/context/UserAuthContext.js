import { createContext, useEffect, useState, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail, 
    
} from "firebase/auth"

import { auth } from "../Firebase";


const userAuthContext = createContext()

export function UserAuthContextProvider({children}) {
    const [user, setUser] = useState()
            

        function signUp(email, password) {
            return createUserWithEmailAndPassword(auth, email, password)
        }

        function login(email, password) {
            return signInWithEmailAndPassword(auth, email, password)
        }

        function logout () {
            return signOut(auth)
        }

        function resetPassword (email) {
            return sendPasswordResetEmail(auth, email)
        }
        
   
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser)
        })
        return (() =>{
            unsubscribe()
        })
    }, [])

    return <userAuthContext.Provider value={{user, signUp,login, logout, resetPassword}}>
    {children}
    </userAuthContext.Provider>
   }

  

    export function useUserAuth() {
        return useContext(userAuthContext)
    }