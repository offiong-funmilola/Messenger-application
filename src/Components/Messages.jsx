import React from 'react'
import {useContext} from 'react'
import MessengerContext from '../Context/MessengerContext'

function Messages({message: {id, name, sender, text, timestamp, photoURL}}) {
    const {user, formatDateDisplay} = useContext(MessengerContext)
    const isOutgoingMessage = user.uid === sender

    return (
        <>
            <div key={id} className={`w-5/6 md:w-2/3 ${isOutgoingMessage ? 'sent self-end' : 'received self-start'}`}>
                <div className={`absolute w-5 h-5 rounded-full translate-x-2 translate-y-2 z-10 ${isOutgoingMessage ? 'left-[-15px] top-[-15px]': 'right-0 bottom-0'}`}>
                    <img src={photoURL} alt={name} className='w-full h-full rounded-full'></img>
                </div>
                <div className='static mb-3 px-4 py-2'>
                    <p className="text-xs">{name}</p>
                    <p className='text-lg'>{text}</p>
                    <p className='absolute bottom-0 right-5 text-xs'>{formatDateDisplay(timestamp)}</p>
                </div>
            </div>
        </>
    )
}

export default Messages
