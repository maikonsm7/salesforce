import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";
import api from '../helpers/api'
import { errorHandler } from "../helpers/error-handler";

function useGrantDate() {
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const getAll = async () => {
        try {
            const data = await api.get('/grant-dates').then(res => res.data)
            return data.grantDates
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const getById = async (id) => {
        try {
            const data = await api.get(`/grant-dates/${id}`).then(res => res.data)
            return data.grantDate
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const create = async (grantDate) => {
        try {
            const data = await api.post('/grant-dates', { ...grantDate }).then(res => res.data)
            navigate('/grant-dates')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const update = async (grantDate, id) => {
        try {
            const data = await api.patch(`/grant-dates/${id}`, { ...grantDate }).then(res => res.data)
            navigate('/grant-dates')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const remove = async (id) => {
        try {
            const data = await api.delete(`/grant-dates/${id}`).then(res => res.data)
            navigate('/grant-dates')
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

export default useGrantDate;

