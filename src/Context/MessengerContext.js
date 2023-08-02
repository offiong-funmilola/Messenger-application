import { createContext, useRef } from "react";
import {db, auth} from '../Config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useEffect, useState} from "react";
import { onSnapshot, doc, updateDoc, collection, query, orderBy, where, limit, or } from "firebase/firestore"; 

const MessengerContext = createContext()

export const MessengerProvider = ({children}) => {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([])
    const [receiver, setReceiver] = useState(null)
    const scrollElement = useRef()

    useEffect(() => {
        if (user) {
            const q = query(collection(db, "messages"), 
                or(
                    where('sender', '==', user.uid),
                    where('receiver.id', '==', user.uid)
                ),
                orderBy('timestamp', 'desc'),
                limit(10)
            );

            const snapshotData = onSnapshot(q, (querySnapshot) => {
                const messages = [];
                querySnapshot?.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id});
                });
                setMessages(messages.reverse())
            })
            return snapshotData
        }
    }, [user, receiver])

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
    }, [user])

    const scrollToBottom = () => {
        setTimeout(() => {
            if (scrollElement.current) {
                scrollElement.current.scrollIntoView({behavior: "smooth"});
            }                
        }, 20);
    }

    const updateMessageAsRead = (message) => {
        const messageRef = doc(db, "messages", message.id);
        updateDoc(messageRef, {
            readStatus: true 
        }).then((message) => {
            console.log(`response ${JSON.stringify(message)}`)
        })
    }

    const updateUnreadMessages = (messages) => {
        let messagesList = [...messages]
        messagesList = messagesList.filter(message => !message.readStatus && message.receiver.id === user.uid)
        messagesList.forEach((message) => {
            updateMessageAsRead(message)
        })
        return messages
    }

    const filterMessagesForReceiver = (message, receiverId) => {
        return (message.sender === receiverId && message.receiver.id === user.uid)
          || (message.sender === user.uid && message.receiver.id === receiverId)
    }

    const unreadMessages = (message, receiverId) => {
        return message.sender === receiverId && message.receiver.id === user.uid && !message.readStatus
    }

    const countUnreadMessages = (receiverId) => {
        let unreadCount = messages.filter((message) => unreadMessages(message, receiverId)).length
        return unreadCount === 0 ? '' : unreadCount
    }

    const userLatestMessage = (receiverId) => {
        let userChats = messages.filter((message) => filterMessagesForReceiver(message, receiverId))
        return userChats.length > 0 ? userChats[userChats.length - 1] : {}
    }

    const formatTextDisplay = (text) => {
        if (!text) return ''
        return text.length > 40 ? `${text.substring(0, 40)}...` : text;
    }

    const formatDateDisplay = (timestamp) => {
        if (!timestamp) return '';
        let currentDate = new Date()
        let messageDate = new Date(timestamp?.seconds * 1000)
        if (isSameDay(currentDate, messageDate)) {
            return formatTime(messageDate)
        } else {
            return formatDate(messageDate)
        }
    }

    const isSameDay = (d1, d2) => {
        return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
    }

    const formatTime = (d) => {
        return d.getHours() + ":" + d.getMinutes();
    }

    const formatDate = (d) => {
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    }
    
    const updateUsersWithLatestMessage = (users) => {
        return users.map((current) => {
            current = {...current, latestMessage: userLatestMessage(current.id)}
            return current
        })
    }

    const sortUsersByLatestMessage = (a, b) => {
        if (a.latestMessage.timestamp?.seconds === b.latestMessage.timestamp?.seconds) {
            return 0
        }
        if (!a.latestMessage.timestamp?.seconds) {
            return 1
        }
        if (!b.latestMessage.timestamp?.seconds) {
            return -1
        }
        return a.latestMessage.timestamp?.seconds < b.latestMessage.timestamp?.seconds ? 1 : -1
    }

    return(
        <MessengerContext.Provider
            value={{
                user,
                messages,
                setUsers,
                users,
                receiver,
                setReceiver,
                setMessages,
                scrollToBottom,
                scrollElement,
                countUnreadMessages,
                filterMessagesForReceiver,
                userLatestMessage,
                formatTextDisplay,
                formatDateDisplay,
                updateUnreadMessages,
                updateUsersWithLatestMessage,
                sortUsersByLatestMessage
            }}
            >
            {children}
        </MessengerContext.Provider>
    )
}
export default MessengerContext
