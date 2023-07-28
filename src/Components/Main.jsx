import React from 'react'
import Messages from './Messages'
import {useRef} from 'react'
import {useContext} from 'react'
import MessengerContext from '../Context/MessengerContext'

function Main() {
    const {messages, user} = useContext(MessengerContext)
    const scroll = useRef()
  return (
    <>
        <div className='overflow-scroll w-full h-[76vh] bg-slate-100 py-4 px-10 flex flex-col'>
            {messages && messages.map((message) =>
                <Messages message={message}/>
            )}
           
        </div>
        <span ref={scroll}></span>
     </>
  )
}

export default Main
