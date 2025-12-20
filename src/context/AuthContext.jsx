import { createContext, useState, useEffect } from "react";
import api from '../helpers/api'

const AuthContext = createContext(null)

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                const data = await api.get(`/auth/profile`).then(res => res.data)
                setUser(data.user)
            }
            setLoading(false)
        }
        checkAuthentication()
    }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthContextProvider}

