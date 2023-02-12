import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error , setError] = useState('');
  const [loading, setLoading] = useState(true) 


  const signInUsingGoogle = () => {
    setLoading(true)
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
    // .then(result => {
    //     const user = result.user;
    //     setUser(user)
    // })
    // .catch(error => {
    //  setError(error.message)
    // })
  }


  const registerUserUsingEmailPassword = (email, password) => {
  setLoading(true)
  return  createUserWithEmailAndPassword(auth, email, password)
    
  }

  const loginUserUsingEmailPassword = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const handleUpdateProfile = (fullName) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: fullName
    })
  }

  const userSignOut = () => {
    signOut(auth)
    .then(() => {
      toast.success(`${user.displayName} logout successfully`)
    })
    .catch(err => {
      toast.error(err.message)
    })
  }

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })

    return ()=> unsubscribe;
  }, [])


  
  const authInfo = {
  signInUsingGoogle,
  registerUserUsingEmailPassword,
  loginUserUsingEmailPassword,
  error,
  user,
  setUser,
  setError,
  loading,
  handleUpdateProfile,
  userSignOut
  }



  return (
  <AuthContext.Provider value={authInfo}>
   {children}
  </AuthContext.Provider>
  );
};



export default AuthProvider;
