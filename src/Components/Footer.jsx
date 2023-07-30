import React from 'react'
import {MdSend} from "react-icons/md"
import {useState, useContext} from 'react'
import {db, auth} from '../Config/firebase'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import MessengerContext from '../Context/MessengerContext';


function Footer() {
    const [currentMessage, setCurrentMessage] = useState('')
    const {receiverUid} = useContext(MessengerContext)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {uid, displayName, photoURL} = auth.currentUser
        if (currentMessage === ''){
            return
        }
        await addDoc(collection(db, "messages"), {
            name: displayName,
            text: currentMessage,
            sender: uid,
            receiver: receiverUid,
            photoURL: photoURL,
            timestamp: serverTimestamp()
        });
        setCurrentMessage('')      
    }

    return (
        <div className='w-full h-[12vh] bg-gray-300 flex items-center justify-center p-10'>
            <form onSubmit={handleSubmit} className='w-3/4 bg-white flex justify-between rounded-lg'>
                <input type='text' value={currentMessage} onChange={(e)=> {setCurrentMessage(e.target.value)}} className='w-3/4 py-3 px-5 focus:outline-none rounded-lg' placeholder='Type a message' />
                    <button type='submit' className='w-7'><MdSend className='text-xl'/></button> 
            </form>   
        </div>
    )
}

export default Footer
