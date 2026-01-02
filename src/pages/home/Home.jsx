import { useState, useEffect } from "react"
import useAlert from "../../hooks/useAlert"

export const Home = () => {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(false)
    const { getTodayAlerts } = useAlert()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getTodayAlerts()
            setAlerts(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
            <div>
                <h3 className="text-center fw-normal">Alertas para hoje</h3>

                {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>
                    {alerts.length > 0 ? (<>
                        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
                            {alerts.map((alert) => (<>
                                <div key={alert.id} className="col">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <p className="card-text justify">{alert.description}</p>
                                            <p className="form-text mb-0">Cliente: {alert.client.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </>))}
                        </div>
                    </>) : (<>
                        <p className="text-center mt-5">Nenhum alerta para hoje</p>
                    </>)}
                </>)}

            </div>
        </>
    )
}