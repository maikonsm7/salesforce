import { useEffect, useState } from "react"
import useClient from "../../hooks/useClient"
import { Link } from "react-router"

export const Clients = () => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false)
    const { getAll } = useClient()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getAll()
            setClients(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
        <div className="m-auto" style={{maxWidth: '730px'}}>

            <h3 className="text-center fw-normal">Clientes</h3>

            <div className="text-end mb-3 mt-4">
                <Link className="btn btn-info" to="/clients/create">Adicionar</Link>
            </div>

            {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>

                {clients.length > 0 ? (
                    <>
                        <div className="rounded-2 mb-2 table-container border p-1">
                            <table className="table table-striped m-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Item</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">phone</th>
                                        <th scope="col" className="text-center">Opções</th>
                                    </tr>
                                </thead>
                                <tbody className="text-truncate">
                                    {clients.map((client, index) => (
                                        <tr key={client.id}>
                                            <td>{index + 1}</td>
                                            <td>{client.name}</td>
                                            <td>{client.phone}</td>
                                            <td>
                                                <div className="d-flex justify-content-around">
                                                    <Link className="nav-link" to={`/clients/update/${client.id}`}><i className="bi bi-pencil"></i></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (<>
                    <p className="text-center mt-5">Nenhum cliente cadastrado</p>
                </>)}
            </>)}
            </div>
        </>
    )
}
