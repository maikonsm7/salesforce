import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useFlashMessage from "../hooks/useFlashMessage";
import api from '../helpers/api'
import { errorHandler } from "../helpers/error-handler";

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
            errorHandler(error, setFlashMessage)
        }
    }
    const register = async (enterprise) => {
        try {
            const data = await api.post('/auth/register', { ...enterprise }).then(res => res.data)
            navigate('/')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const recovery = async (email) => {
        try {
            const data = await api.post('/auth/password-recover', { email }).then(res => res.data)
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const passReset = async (code, password) => {
        try {
            const data = await api.post('/auth/password-reset', { code, password }).then(res => res.data)
            navigate('/')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const updatePass = async (password, newPassword) => {
        try {
            const data = await api.patch('/auth/password-update', { password, newPassword }).then(res => res.data)
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
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
        updatePass,
        passReset,
        logout,
    }
}

export default useAuth;

