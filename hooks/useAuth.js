import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'

const AuthContext = createContext ({
    // initial state is blank
})

export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider 
        value={{
            user: "Bob",
        }}
        >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext);
}