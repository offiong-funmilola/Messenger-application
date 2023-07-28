import { createContext } from "react";
import {db,auth} from '../Config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, } from "firebase/firestore"; 


const MessengerContext = createContext()

export const MessengerProvider = ({children}) => {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([])
    useEffect(()=> {
        const q = query(collection(db, "messages"), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });
            setMessages(messages)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    return(
        <MessengerContext.Provider value={{user, messages}}>
            {children}
        </MessengerContext.Provider>
    )
}
export default MessengerContext