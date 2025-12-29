import { useEffect, useState } from "react"
import useGrantDate from "../../hooks/useGrantDate"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router"
import { firstLastName, dateFormat, releaseDate } from "../../helpers/general"

export const GrantDates = () => {
    const [grantDates, setGrantDates] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { getAll } = useGrantDate()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getAll()
            setGrantDates(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
            <div className="m-auto" style={{ maxWidth: '930px' }}>

                <h3 className="text-center fw-normal">Data de Concessão</h3>

                <div className="text-end mb-3 mt-4">
                    <Link className="btn btn-info" to="/grant-dates/create">Inserir</Link>
                </div>

                {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>

                    {grantDates.length > 0 ? (
                        <>
                            <div className="rounded-2 mb-2 table-container border p-1">
                                <table className="table table-striped m-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Item</th>
                                            <th scope="col">Cliente</th>
                                            {['MASTER', 'ADMIN'].includes(user.role) && (<th scope="col">Criado por</th>)}
                                            <th scope="col">Data Concessão</th>
                                            <th scope="col">Data Liberação</th>
                                            <th scope="col" className="text-center">Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-truncate">
                                        {grantDates.map((grantDate, index) => (
                                            <tr key={grantDate.id}>
                                                <td>{index + 1}</td>
                                                <td>{grantDate.client.name}</td>
                                                {['MASTER', 'ADMIN'].includes(user.role) && (<td>{firstLastName(grantDate.createdBy.name)}</td>)}
                                                <td>{dateFormat(grantDate.date)}</td>
                                                <td>{releaseDate(grantDate.date)}</td>
                                                <td>
                                                    <div className="d-flex justify-content-around">
                                                        <Link className="nav-link" to={`/grant-dates/${grantDate.id}`}><i className="bi bi-eye"></i></Link>
                                                        {user.id === grantDate.createdById && (<>
                                                            <Link className="nav-link" to={`/grant-dates/update/${grantDate.id}`}><i className="bi bi-pencil"></i></Link>
                                                            <Link className="nav-link" to={`/grant-dates/delete/${grantDate.id}`}><i className="bi bi-trash"></i></Link>
                                                        </>)}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (<>
                        <p className="text-center mt-5">Nenhuma data de concessão cadastrada</p>
                    </>)}
                </>)}
            </div>
        </>
    )
}
