import React from 'react'
import LogOut from './LogOut'
import {useContext} from 'react'
import MessengerContext from '../Context/MessengerContext'

function Header() {
    const {user} = useContext(MessengerContext)
    const photo = user? user.photoURL : ''
  
    return (
        <div className='w-full h-[12vh] bg-gray-300 flex items-center justify-between p-10'>
            <div className='w-14 h-14 rounded-full bg-white'>
                <img src={photo} alt='' className='w-full h-full rounded-full'/>
            </div>
            <LogOut/>
        </div>
    )
}

export default Header
