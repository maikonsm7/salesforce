import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";
import api from '../helpers/api'
import { errorHandler } from "../helpers/error-handler";

function useUser() {
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const getAll = async () => {
        try {
            const data = await api.get('/users').then(res => res.data)
            return data.users
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const getById = async (id) => {
        try {
            const data = await api.get(`/users/${id}`).then(res => res.data)
            return data.user
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const create = async (user) => {
        try {
            const data = await api.post('/users', { ...user }).then(res => res.data)
            navigate('/users')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const update = async (user, id) => {
        try {
            const data = await api.patch(`/users/${id}`, { ...user }).then(res => res.data)
            navigate('/users')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }

    return {
        getAll,
        getById,
        create,
        update,
    }
}

export default useUser;

