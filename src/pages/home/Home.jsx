import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAlert from "../../hooks/useAlert"
import useAuth from "../../hooks/useAuth"

export const Home = () => {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(false)
    const { getTodayAlerts } = useAlert()
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getTodayAlerts()
            setAlerts(data)
            setLoading(false)
        }
        loadData()
    }, [])

    const navigateToAlert = (id) => {
        navigate(`/home/complete-alert/${id}`)
    }

    return (
        <>
            <div>

                <div className="text-center mt-3">
                <h3 className="fw-normal">{user.company.name || ''}</h3>
                <span className="form-text">Bem vindo!</span>
                </div>

                {loading && (<p className="text-center mt-5">Carregando...</p>)}

                {alerts && alerts.length > 0 && (<>
                    <h5 className="text-info mt-4">Alertas</h5>
                    <div className="row row-cols-1 row-cols-md-4 g-2 mt-1">
                        {alerts.map((alert) => (<>
                            <div key={alert.id} className="col">
                                <div className="card h-100 card-alert" onClick={() => navigateToAlert(alert.id)}>
                                    <div className="card-body">
                                        <p className="form-text">{alert.description}</p>
                                        <p className="form-text mb-0 fst-italic">{alert.client.name}</p>
                                    </div>
                                </div>
                            </div>
                        </>))}
                    </div>
                </>)}

                {!loading && alerts.length === 0 && (
                    <p className="text-center mt-5">Nenhum alerta para hoje</p>
                )}

            </div>
        </>
    )
}