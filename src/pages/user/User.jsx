import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import useUser from "../../hooks/useUser"
import { dateHour } from "../../helpers/general"

export const User = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const { getById } = useUser()

    useEffect(() => {
        const loadData = async () => {
            const data = await getById(id)
            setUser(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
            <div className="m-auto" style={{maxWidth: 730}}>

                <h3 className="text-center fw-normal">Usuário</h3>

                {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>
                    <div className="card d-flex m-auto mt-4">
                        <div className="card-header">
                            Dados do Usuário
                        </div>
                        <div className="card-body">
                            <p><b className="me-2">Nome:</b> {user.name}</p>
                            <p><b className="me-2">Email:</b> {user.email}</p>
                            <p><b className="me-2">Usuário ativo:</b> {user.active ? (<span className="text-success">Sim</span>) : <span className="text-danger">Não</span>}</p>
                            <p><b className="me-2">Usuário cadastrado em:</b> {dateHour(user.createdAt).split('-')[0]}</p>
                        </div>
                    </div>
                </>)}

                <div className="mt-3 text-center">
                    <Link className="link-info" to="/users">Voltar</Link>
                </div>

            </div>
        </>
    )
}
