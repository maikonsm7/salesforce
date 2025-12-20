import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";
import api from '../helpers/api'

function useUser() {
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const getAll = async () => {
        try {
            const data = await api.get('/users').then(res => res.data)
            return data.users
        } catch (error) {
            setFlashMessage(error.response.data.message, 'danger')
        }
    }
    const getById = async (id) => {
        try {
            const data = await api.get(`/users/${id}`).then(res => res.data)
            return data.user
        } catch (error) {
            setFlashMessage(error.response.data.message, 'danger')
        }
    }
    const create = async (user) => {
        try {
            const data = await api.post('/users', { ...user }).then(res => res.data)
            navigate('/users')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            // setFlashMessage(error.response.data, 'danger')
            // console.log(error.response.data.errors)
            if(error.response.data.errors){
                setFlashMessage('Preencha todos os campos obrigatórios', 'danger')
            }
        }
    }
    const update = async (user, id) => {
        try {
            const data = await api.patch(`/users/${id}`, { ...user }).then(res => res.data)
            navigate('/users')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            setFlashMessage(error.response.data.message, 'danger')
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

