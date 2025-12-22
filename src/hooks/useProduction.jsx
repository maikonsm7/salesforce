import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";
import api from '../helpers/api'
import { errorHandler } from "../helpers/error-handler";

function useProduction() {
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const getAll = async () => {
        try {
            const data = await api.get('/productions').then(res => res.data)
            return data.productions
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const getById = async (id) => {
        try {
            const data = await api.get(`/productions/${id}`).then(res => res.data)
            return data.production
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const create = async (production) => {
        try {
            const data = await api.post('/productions', { ...production }).then(res => res.data)
            navigate('/productions')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const update = async (production, id) => {
        try {
            const data = await api.patch(`/productions/${id}`, { ...production }).then(res => res.data)
            navigate('/productions')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const remove = async (id) => {
        try {
            const data = await api.delete(`/productions/${id}`).then(res => res.data)
            navigate('/productions')
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
        remove,
    }
}

export default useProduction;

