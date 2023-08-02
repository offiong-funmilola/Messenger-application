import React, { useEffect } from 'react'
import {MdSend} from "react-icons/md"
import {useState, useContext} from 'react'
import {db, auth} from '../Config/firebase'
import {collection, addDoc, serverTimestamp} from "firebase/firestore"; 
import MessengerContext from '../Context/MessengerContext';

function MessageForm() {
    const [currentMessage, setCurrentMessage] = useState('')
    const {receiver, setTriggerUpdate, scrollToBottom} = useContext(MessengerContext)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {uid, displayName, photoURL} = auth.currentUser
        if (currentMessage === '') {
            return
        }
        await addDoc(collection(db, "messages"), {
            name: displayName,
            text: currentMessage,
            sender: uid,
            receiver: {
                id: receiver.id,
                photoURL: receiver.photoURL,
                name: receiver.name
            },
            photoURL: photoURL,
            readStatus: false,
            timestamp: serverTimestamp()
        });
        setCurrentMessage('')
        setTriggerUpdate(true)
        scrollToBottom()
    }

    useEffect(() => {
        scrollToBottom()
    }, [scrollToBottom])

    return (
        <div className='w-full h-[12vh] bg-gray-300 flex items-center justify-end p-5 md:p-10 self-end absolute left-0 bottom-0'>
            <form onSubmit={handleSubmit} className='w-full bg-white flex justify-between rounded-lg'>
                <input type='text' value={currentMessage} onChange={(e)=> {setCurrentMessage(e.target.value)}} className='w-3/4 py-3 px-5 focus:outline-none rounded-lg' placeholder='Type a message' />
                    <button type='submit' className='w-7'><MdSend className='text-xl'/></button> 
            </form>   
        </div>
    )
}

export default MessageForm
