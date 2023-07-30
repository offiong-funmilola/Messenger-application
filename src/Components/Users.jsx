import React from 'react'
import { useContext } from 'react'
import MessengerContext from '../Context/MessengerContext'


function Users({user}) {
    const {setReceiverUid} = useContext(MessengerContext)

    return (
        <div key={user.id} className='w-full h-14 flex items-center justify-between px-2 bg-gray-400' onClick={(e)=>setReceiverUid(user.id)}>
            <div className='flex w-3/4 gap-2 items-center'>
                <div className='w-10 h-10 rounded-full'>
                    <img src={user.photoURL} alt='' className='w-full h-full rounded-full'></img>
                </div>
                <div>
                    <p>{user.name}</p>
                    <p>Message</p>
                </div>
            </div>
            <div>
                <p>time</p>
                <p></p>
            </div>
        </div>
    )
}

export default Users
