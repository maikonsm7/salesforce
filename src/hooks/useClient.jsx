import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";
import api from '../helpers/api'

function useClient() {
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const getAll = async () => {
        try {
            const data = await api.get('/clients').then(res => res.data)
            return data.clients
        } catch (error) {
            setFlashMessage(error.response.data.message, 'danger')
        }
    }
    const getById = async (id) => {
        try {
            const data = await api.get(`/clients/${id}`).then(res => res.data)
            return data.client
        } catch (error) {
            setFlashMessage(error.response.data.message, 'danger')
        }
    }
    const create = async (client) => {
        try {
            const data = await api.post('/clients', { ...client }).then(res => res.data)
            navigate('/clients')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            // setFlashMessage(error.response.data, 'danger')
            // console.log(error.response.data.errors)
            if(error.response.data.errors){
                setFlashMessage('Preencha todos os campos obrigatórios', 'danger')
            }
        }
    }
    const update = async (client, id) => {
        try {
            const data = await api.patch(`/clients/${id}`, { ...client }).then(res => res.data)
            navigate('/clients')
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

export default useClient;

