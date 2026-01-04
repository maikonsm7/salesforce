import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";
import api from '../helpers/api'
import { errorHandler } from "../helpers/error-handler";

function useAlert() {
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const getAll = async () => {
        try {
            const data = await api.get('/alerts').then(res => res.data)
            return data.alerts
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const getById = async (id) => {
        try {
            const data = await api.get(`/alerts/${id}`).then(res => res.data)
            return data.alert
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const getTodayAlerts = async () => {
        try {
            const data = await api.get('/alerts/today-alerts').then(res => res.data)
            return data.alerts
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const create = async (alert) => {
        try {
            const data = await api.post('/alerts', { ...alert }).then(res => res.data)
            navigate('/alerts')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const update = async (alert, id) => {
        try {
            const data = await api.patch(`/alerts/${id}`, { ...alert }).then(res => res.data)
            navigate('/alerts')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const completeAlert = async (id) => {
        try {
            const data = await api.patch(`/alerts/complete/${id}`).then(res => res.data)
            navigate('/home')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }
    const remove = async (id) => {
        try {
            const data = await api.delete(`/alerts/${id}`).then(res => res.data)
            navigate('/alerts')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }

    return {
        getAll,
        getById,
        getTodayAlerts,
        create,
        update,
        completeAlert,
        remove,
    }
}

export default useAlert;

