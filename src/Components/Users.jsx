import React from 'react'
import { useContext } from 'react'
import MessengerContext from '../Context/MessengerContext'

function Users({user, index}) {
    const {setReceiver, receiver, countUnreadMessages, formatTextDisplay, formatDateDisplay} = useContext(MessengerContext)

    const handleClick = () => {
        setReceiver(user)
    }

    return (
        <div className={`w-full flex items-center justify-between py-4 px-2 bg-white cursor-pointer active:bg-gray-200 ${receiver && user.id === receiver.id ? 'current-chat' : 'other-chat'}`} onClick={handleClick}>
            <div className='flex w-full gap-2 items-center pr-6'>
                <div className='w-10 h-10 rounded-full'>
                    <img src={user.photoURL} alt={user.name} className='w-full h-full rounded-full'></img>
                </div>
                <div>
                    <p>{user.name}</p>
                    <p>{formatTextDisplay(user.latestMessage?.text)}</p>
                </div>
            </div>
            <div className='relative p-5'>
                <p className='absolute top-[-5px] right-5 badge'>{countUnreadMessages(user.id)}</p>
                <p className='absolute bottom-0 right-3 text-xs'>{formatDateDisplay(user.latestMessage?.timestamp)}</p>
            </div>
        </div>
    )
}

export default Users
