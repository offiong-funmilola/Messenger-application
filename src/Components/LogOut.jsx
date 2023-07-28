import React from 'react'
import { signOut } from "firebase/auth";
import {auth} from '../Config/firebase'
import {useNavigate} from 'react-router-dom'



function LogOut() {
  const navigate = useNavigate()
    const handleLogOut = () => {
        signOut(auth)
        navigate('/')
    }
  return (
    <div className='w-28 h-10'>
        <button className='P-3 bg-white text-lg w-full h-full ' onClick={handleLogOut}>Log out</button>
    </div>
  )
}

export default LogOut