import React, { useEffect, useState } from 'react'
import {USER_MODEL} from '@src/Constants'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '@services/db'
import { isBrowser } from '@utils'

export const UserContext = React.createContext(USER_MODEL);

export const UserHOC = ({children}) => {
  const [userContextData, setUserContextData] = useState(USER_MODEL)
  if(!isBrowser) return (<></>)
  const [user, loading, error] = useAuthState(firebase.auth())

  useEffect(() => {
    if (user) {
      setUserContextData({
        email: user.email,
        uid: user.uid,
      })
    } else {
      setUserContextData(USER_MODEL)
    }
  }, [user])

  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  )
}
