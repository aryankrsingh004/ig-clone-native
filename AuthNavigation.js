import { View, Text } from 'react-native'
import React from 'react'
import { SignedInStack , SignedOutStack} from './navigation'
import { useEffect } from 'react'
import { useState } from 'react'
import { auth } from './firebase'

const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)

    const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)
    useEffect(
        () => 
            auth.onAuthStateChanged(user => userHandler(user)),
        [])
  return <>{currentUser ? <SignedInStack/> : <SignedOutStack/>}</>
}

export default AuthNavigation