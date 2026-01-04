import { useEffect, useState } from "react"
import { Link } from "react-router"
import useClient from "../../hooks/useClient"
import { applyMask } from "../../helpers/general"
import useAuth from "../../hooks/useAuth"

export const Clients = () => {
    const [clients, setClients] = useState([])
    const [clientsFilter, setClientsFilter] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const { getAll } = useClient()
    const { user } = useAuth()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getAll()
            setClients(data)
            setLoading(false)
        }
        loadData()
    }, [])

    const handleSearch = e => {
        const txt = e.target.value
        const filteredData = clients.filter(client => client.name.toLowerCase().includes(txt.toLowerCase()))
        setClientsFilter(filteredData)
        setSearch(txt)
    }

    return (
        <>
            <div className="m-auto" style={{maxWidth: 730}}>

                <h3 className="text-center fw-normal">Clientes</h3>

                <div className="d-flex justify-content-between mb-3 mt-4">
                    <div>
                        <input type="text" className="form-control" name="search" placeholder="Pesquisar" value={search} onChange={handleSearch} />
                    </div>
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

                                        {search.length > 0 ? (<>
                                            {clientsFilter.map((client, index) => (
                                                <tr key={client.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{client.name}</td>
                                                    <td>{applyMask(client.phone, "(##) #####-####")}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-around">
                                                            <Link className="nav-link" to={`/clients/${client.id}`}><i className="bi bi-eye"></i></Link>
                                                            {['MASTER', 'ADMIN'].includes(user.role) && (<Link className="nav-link" to={`/clients/update/${client.id}`}><i className="bi bi-pencil"></i></Link>)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>) : (<>
                                            {clients.map((client, index) => (
                                                <tr key={client.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{client.name}</td>
                                                    <td>{applyMask(client.phone, "(##) #####-####")}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-around">
                                                            <Link className="nav-link" to={`/clients/${client.id}`}><i className="bi bi-eye"></i></Link>
                                                            {['MASTER', 'ADMIN'].includes(user.role) && (<Link className="nav-link" to={`/clients/update/${client.id}`}><i className="bi bi-pencil"></i></Link>)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>)}

                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex flex-column">
                                <span className="form-text">Total Clientes cadastrados: <b>{clients.length}</b></span>
                                <span className="form-text">Filtro: <b>{clientsFilter.length}</b></span>
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
