import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useFlashMessage from "../hooks/useFlashMessage";
import api from '../helpers/api'

function useAuth() {
    const { user, loading, setUser } = useContext(AuthContext)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

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
    const register = async (enterprise) => {
        try {
            const data = await api.post('/auth/register', { ...enterprise }).then(res => res.data)
            setFlashMessage(data.message, 'success')
            navigate('/')
        } catch (error) {
            setFlashMessage(error.response.data.message, 'danger')
        }
    }
    const recovery = async (email) => {
        try {
            const data = await api.post('/auth/password-recover', { email }).then(res => res.data)
            setFlashMessage(data.message, 'success')
        } catch (error) {
            setFlashMessage(error.response.data.message, 'danger')
        }
    }
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return {
        user,
        loading,
        login,
        register,
        recovery,
        logout
    }
}

export default useAuth;

