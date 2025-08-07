import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
   const [token, setToken] = useState(localStorage.getItem("token") || "")
   const [role, setRole] = useState("")
   const currency = "₹"

   const login = (newToken) => {
    setToken(newToken)
    localStorage.setItem("token", newToken)
   }

    const logout = () => {
    setToken("")
    localStorage.removeItem("token")
   }
                                                                                                                                                       
useEffect(() => {
  
})

  return (
    <AuthContext.Provider value={{role, login, logout, token, currency}}>
       {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider


export const useAuth = () => useContext(AuthContext)
