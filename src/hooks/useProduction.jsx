import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";
import api from '../helpers/api'

function useProduction() {
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const getAll = async () => {
        try {
            const data = await api.get('/productions').then(res => res.data)
            return data.productions
        } catch (error) {
            setFlashMessage(error.response.data.message, 'danger')
        }
    }
    const getById = async (id) => {
        try {
            const data = await api.get(`/productions/${id}`).then(res => res.data)
            return data.production
        } catch (error) {
            setFlashMessage(error.response.data.message, 'danger')
        }
    }
    const create = async (production) => {
        try {
            const data = await api.post('/productions', { ...production }).then(res => res.data)
            navigate('/productions')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            // setFlashMessage(error.response.data, 'danger')
            // console.log(error.response.data.errors)
            if(error.response.data.errors){
                setFlashMessage('Preencha todos os campos obrigatórios', 'danger')
            }
        }
    }
    const update = async (production, id) => {
        try {
            const data = await api.patch(`/productions/${id}`, { ...production }).then(res => res.data)
            navigate('/productions')
            setFlashMessage(data.message, 'success')
        } catch (error) {
            console.log(error.response.data)
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

export default useProduction;

