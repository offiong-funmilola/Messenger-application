import { createContext, useRef } from "react";
import {db, auth} from '../Config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useEffect, useState} from "react";
import { onSnapshot, collection, query, orderBy, where, limit, and, or } from "firebase/firestore"; 

const MessengerContext = createContext()

export const MessengerProvider = ({children}) => {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([])
    const [receiver, setReceiver] = useState(null)
    const [triggerUpdate, setTriggerUpdate] = useState(false)
    const scrollElement = useRef()

    useEffect(() => {
        console.log(`recevier ${JSON.stringify(receiver)} and user ${JSON.stringify(user)}`)
        if (receiver || triggerUpdate) {
            console.log('getting messages')
            const q = query(collection(db, "messages"), 
                or(
                    and(
                        where('sender', '==', user.uid), where('receiver.id', '==', receiver.id)
                    ), 
                    and(
                        where('sender', '==', receiver.id), where('receiver.id', '==', user.uid)
                    )
                ),
                orderBy('timestamp', 'desc'),
                limit(10)
            );

            onSnapshot(q, (querySnapshot) => {
                const messages = [];
                querySnapshot?.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id});
                });
                console.log(`messages ${messages}`)
                setMessages(messages.reverse())
            })

            setTriggerUpdate(false)
        }
    }, [user, receiver, triggerUpdate])

    useEffect(() => {

    }, [])

    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const usersList = []
            querySnapshot?.forEach((doc) => {
                usersList.push({...doc.data(), id: doc.id})
            });
            setUsers(usersList)
        });
        return unsubscribe
    }, [])

    const scrollToBottom = () => {
        setTimeout(() => {
            console.log(`performing scroll action ... ${scrollElement}`)
            if (scrollElement.current) {
                scrollElement.current.scrollIntoView({behavior: "smooth"});
            }                
        }, 20);
    }
    
    return(
        <MessengerContext.Provider value={{user, messages, setUsers, users, receiver, setReceiver, setTriggerUpdate, setMessages, scrollToBottom, scrollElement}}>
            {children}
        </MessengerContext.Provider>
    )
}
export default MessengerContext
