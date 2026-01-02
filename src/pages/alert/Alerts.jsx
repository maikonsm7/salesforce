import { useEffect, useState } from "react"
import { Link } from "react-router"
import useAlert from "../../hooks/useAlert"
import { dateFormat } from "../../helpers/general"

export const Alerts = () => {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(false)
    const { getAll } = useAlert()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getAll()
            setAlerts(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
            <div className="m-auto" style={{ maxWidth: '830px' }}>

                <h3 className="text-center fw-normal">Alertas</h3>

                <div className="text-end mb-3 mt-4">
                    <Link className="btn btn-info" to="/alerts/create">Inserir</Link>
                </div>

                {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>

                    {alerts.length > 0 ? (
                        <>
                            <div className="rounded-2 mb-2 table-container border p-1">
                                <table className="table table-striped m-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Item</th>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Data do alerta</th>
                                            <th scope="col" className="text-center">Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-truncate">
                                        {alerts.map((alert, index) => (
                                            <tr key={alert.id}>
                                                <td>{index + 1}</td>
                                                <td>{alert.client.name}</td>
                                                <td>{dateFormat(alert.date)}</td>
                                                <td>
                                                    <div className="d-flex justify-content-around">
                                                        <Link className="nav-link" to={`/alerts/${alert.id}`}><i className="bi bi-eye"></i></Link>
                                                        <Link className="nav-link" to={`/alerts/update/${alert.id}`}><i className="bi bi-pencil"></i></Link>
                                                        <Link className="nav-link" to={`/alerts/delete/${alert.id}`}><i className="bi bi-trash"></i></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (<>
                        <p className="text-center mt-5">Nenhum alerta cadastrado</p>
                    </>)}
                </>)}
            </div>
        </>
    )
}
