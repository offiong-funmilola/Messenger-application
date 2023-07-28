import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import MessengerContext from '../Context/MessengerContext'

function Protected({children}) {
    const {user} = useContext(MessengerContext)
    if(!user){
        return <Navigate to='/' />
    }
    else {
        return children
    }
}

export default Protected
