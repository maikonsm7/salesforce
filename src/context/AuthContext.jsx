import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../hooks/useFlashMessage";
import api from '../helpers/api'

const AuthContext = createContext(null)

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

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

    const login = async (email, password) => {
        try {
            const data = await api.post('/auth/login', { email, password }).then(res => res.data)
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
        } catch (error) {
            setFlashMessage(error.response.data.message, 'danger')
        }
    }
    const recovery = async (email) => {
        let msg = ''
        let type = 'success'
        try {
            const data = await api.post('/auth/password-recover', { email }).then(res => res.data)
            msg = data.message
        } catch (error) {
            msg = error.response.data.message
            type = 'danger'
        }
        setFlashMessage(msg, type)
    }
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, recovery }}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthContextProvider}

