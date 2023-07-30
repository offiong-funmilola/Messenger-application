import React from 'react'
import Messages from './Messages'
import {useContext} from 'react'
import MessengerContext from '../Context/MessengerContext'
import Users from './Users'

function Main() {
    const {messages, users, user, receiverUid} = useContext(MessengerContext)
    console.log(`${receiverUid} and ${user.uid}`)
  return (
    <>
      <div className='overflow-scroll w-full h-[76vh] grid grid-rows-1 grid-cols-3'>
        <div className='row-span-1 col-span-1'>
          {users && users.filter((item)=>(user.uid !== item.id)).map((user)=> 
            <Users user={user}/>
          )}
          
        </div>
        <div className='row-span-1 col-start-2 col-end-4 bg-slate-100 py-4 px-10 flex flex-col'>
          {messages && messages.map((message) =>
            <Messages message={message}/>
          )} 
        </div>
      </div>
    </>
  )
}

export default Main
