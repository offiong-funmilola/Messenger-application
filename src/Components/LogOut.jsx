import React, {useContext} from 'react'
import { signOut } from "firebase/auth";
import {auth} from '../Config/firebase'
import {useNavigate} from 'react-router-dom'
import MessengerContext from '../Context/MessengerContext'

function LogOut() {
  const {setReceiver} = useContext(MessengerContext)
  const navigate = useNavigate()
  const handleLogOut = () => {
      setReceiver(null)
      signOut(auth)
      navigate('/')
  }

  return (
    <div className=' w-20 md:w-28 h-10'>
        <button className='p-1 md:P-3 bg-white text-lg w-full h-full ' onClick={handleLogOut}>Log out</button>
    </div>
  )
}

export default LogOut