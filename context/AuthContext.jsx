import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState,useEffect,useContext,createContext } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext()
export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider(props){
    const {children} = props
    const [globaluser,setGlobalUser] = useState(null);
    const [globalData,setGlobalData]= useState(null);
    const [isLoading,setIsLoading]= useState(false);

    function signup(email,password){
        return createUserWithEmailAndPassword(auth)
    }
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }
    function resetPassword(email,password){
        return sendPasswordResetEmail(auth,email)
    }
      function logout(email,password){
        setUser(null)
        setGlobalData(null)
        return signOut(auth)
      }  
    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth,async (user)=>{
            if (!user){
                console.log("No Active User")
                return}

            try{
                setIsLoading(true)
                const docRef=doc(db,'users',user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData={}
                if (docSnap.exists()){
                    console.log('Found user data')
                    firebaseData=docSnap.data()
                }
                setGlobalData(firebaseData)
            }catch(err){
                console.log(err.message)
            }finally{
                setIsLoading(false)
            }
         })
        return unsubscribe
    },[])
    const value = {globaluser,globalData,setGlobalData,isLoading,signup,login,logout}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}