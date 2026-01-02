import useFlashMessage from "./useFlashMessage";
import api from '../helpers/api'
import { errorHandler } from "../helpers/error-handler";

function useDashboard() {
    const { setFlashMessage } = useFlashMessage()

    const getProductionReport = async () => {
        try {
            const data = await api.get('/dashboard').then(res => res.data)
            return data.report
        } catch (error) {
            errorHandler(error, setFlashMessage)
        }
    }

    return {
        getProductionReport,
    }
}

export default useDashboard;
