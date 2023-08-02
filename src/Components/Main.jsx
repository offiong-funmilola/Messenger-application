import React, {useContext} from 'react'
import Messages from './Messages'
import MessengerContext from '../Context/MessengerContext'
import Users from './Users'
import MessageForm from './MessageForm'
import {MdArrowBackIosNew} from 'react-icons/md'

function Main() {
  const {messages, users, filterMessagesForReceiver, sortUsersByLatestMessage, updateUsersWithLatestMessage, updateUnreadMessages, user, receiver, setReceiver, setMessages, scrollElement} = useContext(MessengerContext)
  const messageWithCurrentUser = receiver ? messages.filter((message) => filterMessagesForReceiver(message, receiver.id)) : []
  const noMessages = messageWithCurrentUser.length === 0
  console.log(`messages ${messages.length}`)

  const handleMessages = () => {
    setReceiver(null)
    setMessages([])
  }

  return (
    <>
      <div className={`overflow-scroll w-full md:h-[88vh] grid grid-rows-1 grid-cols-1 md:grid-cols-3 ${receiver ? 'h-[100vh]' : ''}`}>
        <div className={`row-span-1 col-span-1 overflow-scroll flex flex-col gap-1${receiver ? ' hidden md:block' : ''}`}>
          {users && updateUsersWithLatestMessage(users).filter((current) => user.uid !== current.id)
          .sort(sortUsersByLatestMessage)
          .map((user) => 
            <Users user={user} index={user.id} />
          )}
        </div>
        <div className={`flex-col bg-slate-100 md:flex md:row-span-1 md:col-start-2 md:col-end-4 pb-16 md:pb-24 md:pt-0 relative ${noMessages ? 'pt-8' : ''} ${(noMessages || !receiver) ? 'justify-center' : ''} ${receiver ? 'flex col-span-1' : 'hidden'}`}>
          {receiver && 
            <>
              <div className={`md:hidden w-full bg-gray-200 flex items-center gap-2 py-4 px-2 ${noMessages ? 'absolute top-0 left-0' : ''}`}>
                <div className='p-3 cursor-pointer' onClick={handleMessages}>
                    <MdArrowBackIosNew />
                </div>
                <div className='w-14 h-14 rounded-full bg-white'>
                    <img src={receiver?.photoURL} alt='' className='w-full h-full rounded-full'/>
                </div>
                <div>
                    <p>{receiver.name}</p>
                </div>
              </div>
              {noMessages &&
                <p className="text-center font-sans text-lg">
                  There are no previous messages for this chat. Start chatting now
                </p>
              }
              {messages && messages.length > 0 &&
                <>
                  <div className="px-5 pt-4 overflow-scroll">
                      {updateUnreadMessages(messageWithCurrentUser)
                        .map((message) =>
                          <Messages message={message} user={user.uid === message.sender ? message.sender : message.receiver} />
                      )}
                      <span className="w-full scroll-element self-end block" ref={scrollElement}></span>
                  </div>
                </>
              }
              <MessageForm />
            </>
          }
          {!receiver &&
            <p className="text-center font-sans text-lg hidden md:block">
              Please select a user to chat with
            </p>
          }
        </div>
      </div>
    </>
  )
}

export default Main
