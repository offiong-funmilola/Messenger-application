import React from 'react'
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import {auth} from '../Config/firebase'
import { useNavigate } from 'react-router-dom'


function SignIn() {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    
    const googleSignIn = (e) => {
        signInWithPopup (auth, provider)
        .then((result)=>{
            console.log(result)
            navigate('/Chat')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div className='w-1/2 h-20 flex items-center justify-center'>
            <GoogleButton onClick={googleSignIn}/>
        </div>
    </div>
  )
}

export default SignIn