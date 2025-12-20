import { useEffect, useState } from "react"
import useProduction from "../../hooks/useProduction"
import { Link } from "react-router"

export const Productions = () => {
    const [productions, setProductions] = useState([])
    const [loading, setLoading] = useState(false)
    const { getAll } = useProduction()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getAll()
            setProductions(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
        <div className="m-auto" style={{maxWidth: '730px'}}>

            <h3 className="text-center fw-normal">Produções</h3>

            <div className="text-end mb-3 mt-4">
                <Link className="btn btn-info" to="/productions/create">Inserir</Link>
            </div>

            {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>

                {productions.length > 0 ? (
                    <>
                        <div className="rounded-2 mb-2 table-container border p-1">
                            <table className="table table-striped m-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Item</th>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Data/Hora</th>
                                        <th scope="col" className="text-center">Opções</th>
                                    </tr>
                                </thead>
                                <tbody className="text-truncate">
                                    {productions.map((production, index) => (
                                        <tr key={production.id}>
                                            <td>{index + 1}</td>
                                            <td>{production.clientId}</td>
                                            <td>{production.createdAt}</td>
                                            <td>
                                                <div className="d-flex justify-content-around">
                                                    <Link className="nav-link" to={`/productions/update/${production.id}`}><i className="bi bi-pencil"></i></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (<>
                    <p className="text-center mt-5">Nenhuma produção cadastrada</p>
                </>)}
            </>)}
            </div>
        </>
    )
}
