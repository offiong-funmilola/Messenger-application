import React from 'react'
import LogOut from './LogOut'
import {useContext} from 'react'
import MessengerContext from '../Context/MessengerContext'

function Header() {
    const {user, receiver} = useContext(MessengerContext)
    const photo = user? user.photoURL : ''
  
    return (
        <div className={`md:flex w-full bg-gray-300 items-center justify-between p-5 ${receiver ? ' hidden' : ' flex'}`}>
            <div className='w-14 h-14 rounded-full bg-white'>
                <img src={photo} alt='' className='w-full h-full rounded-full'/>
            </div>
            <LogOut/>
        </div>
    )
}

export default Header
