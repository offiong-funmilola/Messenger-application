import React from 'react'
import {useContext} from 'react'
import MessengerContext from '../Context/MessengerContext'


function Messages({message}) {
    const {user} = useContext(MessengerContext)
    const apply = user.uid === message.uid 
    
    return (
        <>
            <div key={message.id} className={`w-5/6 md:w-2/3 ${apply ? 'sent self-end' : 'received self-start'}`}>
                <div className={`absolute w-5 h-5 rounded-full translate-x-2 translate-y-2 z-10 ${apply? 'left-[-15px] top-[-15px]': 'right-0 bottom-0'}`}>
                    <img src={message.photoURL} alt='' className='w-full h-full rounded-full'></img>
                </div>
                <div className='static mb-3 px-4 py-2'>
                    <p className="text-xs">{message.name}</p>
                    <p className='text-lg'>{message.text}</p>
                    <p className='absolute bottom-0 right-5 text-xs'>{new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()}</p>
                </div>
                    
            </div>  
            
        </>
    )
}

export default Messages
