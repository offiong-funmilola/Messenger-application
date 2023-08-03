import React, { useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth'
import {db, auth} from '../Config/firebase'
import { useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import {collection, query, doc, setDoc, getDocs, where} from 'firebase/firestore'

function SignIn() {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
        
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then(result => {
            const values = {
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                password: null
            }
            const usersQuery = query(collection(db, 'users'), where('email', '==', values.email));
            getDocs(usersQuery).then((item) => {
                const user = item.docs.length > 0 ? item.docs[0] : null
                if (user) {
                    navigate('/')
                }
                else{
                    const usersRef = doc(db, 'users', auth.currentUser.uid)
                    setDoc(usersRef, values, { merge: true })
                    navigate('/') 
                }
            });
        })
        .catch(err => console.log(err))    
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-1/2 h-20 flex items-center justify-center'>
                <GoogleButton onClick={signInWithGoogle}/>
            </div>
        </div>
    )
}

export default SignIn