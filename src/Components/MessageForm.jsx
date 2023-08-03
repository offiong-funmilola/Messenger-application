import React, { useEffect } from 'react'
import {MdSend} from "react-icons/md"
import {useState, useContext} from 'react'
import {db, auth} from '../Config/firebase'
import {collection, addDoc, serverTimestamp} from "firebase/firestore"; 
import MessengerContext from '../Context/MessengerContext';

function MessageForm() {
    const [currentMessage, setCurrentMessage] = useState('')
    const {receiver, scrollToBottom} = useContext(MessengerContext)
    
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
        scrollToBottom()
    }

    useEffect(() => {
        scrollToBottom()
    }, [scrollToBottom])

    return (
        <div className='w-full bg-gray-300 flex items-center justify-end p-3 md:p-5 self-end absolute left-0 bottom-0'>
            <form onSubmit={handleSubmit} className='w-full bg-white rounded-lg relative'>
                <input type='text' value={currentMessage} onChange={(e)=> {setCurrentMessage(e.target.value)}} className='w-full py-3 px-5 pr-10 focus:outline-none rounded-lg' placeholder='Type a message' />
                <button type='submit' className='p-4 absolute right-0 top-0'><MdSend className='text-xl'/></button> 
            </form>   
        </div>
    )
}

export default MessageForm
