import axios from "axios"
import useFlashMessage from "../hooks/useFlashMessage"

const api = axios.create({
    // baseURL: 'https://www.itacoatiaracei.com.br/api'
    baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    const { setFlashMessage } = useFlashMessage()
    setFlashMessage(error.response.data.message, 'danger')
  }
)

export default api;