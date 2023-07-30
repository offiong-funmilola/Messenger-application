import { createContext } from "react";
import {db, auth} from '../Config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy,getDocs, where, limit, and, or } from "firebase/firestore"; 


const MessengerContext = createContext()

export const MessengerProvider = ({children}) => {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([])
    const [receiverUid, setReceiverUid] = useState('')
    
    
    useEffect(()=> {
        const q = query(collection(db, "messages"), 
            or(
                and(
                    where('sender', '==', user.uid), where('receiver', '==', receiverUid)
                ), 
                and(
                    where('sender', '==', receiverUid), where('receiver', '==', user.uid)
                )
            ),
            orderBy('timestamp', 'desc'),
            limit(10)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot?.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });
            setMessages(messages.reverse())
        })
        return () => {
            unsubscribe()
        }
    }, [receiverUid, user.uid])

    useEffect(()=>{
        const getUsers =  async() => {
            const usersList = []
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.docs.forEach((doc) => {
                usersList.push({...doc.data(), id: doc.id})
            })
            setUsers(usersList)
        }
        return () => getUsers()
        
    });

    
    return(
        <MessengerContext.Provider value={{user, messages, setUsers, users, receiverUid, setReceiverUid}}>
            {children}
        </MessengerContext.Provider>
    )
}
export default MessengerContext
