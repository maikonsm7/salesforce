import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAlert from "../../hooks/useAlert"

export const Home = () => {
    const [alerts, setAlerts] = useState([])
    const [benefitsReleased, setBenefitsReleased] = useState([])
    const [loading, setLoading] = useState(false)
    const { getTodayAlerts, getBenefitsReleased } = useAlert()
    const navigate = useNavigate()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const [alertsData, benefitsReleasedData] = await Promise.all([
                getTodayAlerts(),
                getBenefitsReleased()
            ])
            setAlerts(alertsData)
            setBenefitsReleased(benefitsReleasedData)
            setLoading(false)
        }
        loadData()
    }, [])

    const navigateToClient = (clientId) => {
        navigate(`/client-benefit-released/${clientId}`)
    }

    return (
        <>
            <div>
                <h3 className="text-center fw-normal">Alertas para hoje</h3>

                {loading && (<p className="text-center mt-5">Carregando...</p>)}

                {benefitsReleased && (<>
                    <h5 className="text-info">Benefícios Liberados</h5>
                    <div className="row row-cols-1 row-cols-md-4 g-2 mt-1">
                        {benefitsReleased.map((benefit) => (<>
                            <div key={benefit.id} className="col">
                                <div className="card h-100 released-benefit" onClick={() => navigateToClient(benefit.clientId)}>
                                    <div className="card-body">
                                        <span className="form-text">{benefit.client.name}</span>
                                    </div>
                                </div>
                            </div>
                        </>))}
                    </div>
                </>)}

                {alerts && (<>
                    <h5 className="text-info mt-4">Alertas</h5>
                    <div className="row row-cols-1 row-cols-md-4 g-2 mt-1">
                        {alerts.map((alert) => (<>
                            <div key={alert.id} className="col">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <p className="form-text">{alert.description}</p>
                                        <p className="form-text mb-0 fst-italic">{alert.client.name}</p>
                                    </div>
                                </div>
                            </div>
                        </>))}
                    </div>
                </>)}
            </div>
        </>
    )
}