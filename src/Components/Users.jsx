import React from 'react'
import { useContext } from 'react'
import MessengerContext from '../Context/MessengerContext'

function Users({user, index}) {
    const {setReceiver} = useContext(MessengerContext)

    const handleClick = (e) => {
        setReceiver(user)
    }

    return (
        <div key={index} className={`w-full h-14 flex items-center justify-between px-2 bg-gray-400 cursor-pointer active:bg-gray-200`} onClick={handleClick}>
            <div className='flex w-3/4 gap-2 items-center'>
                <div className='w-10 h-10 rounded-full'>
                    <img src={user.photoURL} alt={user.name} className='w-full h-full rounded-full'></img>
                </div>
                <div>
                    <p>{user.name}</p>
                    <p>Mess</p>
                </div>
            </div>
            <div>
                <p>Time</p>
                <p></p>
            </div>
        </div>
    )
}

export default Users
