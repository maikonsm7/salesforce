import { useEffect, useState } from "react"
import useUser from "../../hooks/useUser"
import { Link } from "react-router"

export const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const { getAll } = useUser()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getAll()
            setUsers(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
            <div className="m-auto" style={{maxWidth: 930}}>

                <h3 className="text-center fw-normal">Usuários</h3>

                <div className="text-end mb-3 mt-4">
                    <Link className="btn btn-info" to="/users/create">Adicionar</Link>
                </div>

                {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>

                    {users.length > 0 ? (
                        <>
                            <div className="rounded-2 mb-2 table-container border p-1">
                                <table className="table table-striped m-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Item</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Ativo</th>
                                            <th scope="col" className="text-center">Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-truncate">
                                        {users.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.active ? (<span className="text-success">Sim</span>) : <span className="text-danger">Não</span>}</td>
                                                <td>
                                                    <div className="d-flex justify-content-around">
                                                        <Link className="nav-link" to={`/users/${user.id}`}><i className="bi bi-eye"></i></Link>
                                                        <Link className="nav-link" to={`/users/update/${user.id}`}><i className="bi bi-pencil"></i></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (<>
                        <p className="text-center mt-5">Nenhum usuário cadastrado</p>
                    </>)}
                </>)}
            </div>
        </>
    )
}
