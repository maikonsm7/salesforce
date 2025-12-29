import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import useGrantDate from "../../hooks/useGrantDate"
import useAuth from "../../hooks/useAuth"
import { dateFormat, releaseDate } from "../../helpers/general"

export const GrantDate = () => {
    const [grantDate, setGrantDate] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const { user } = useAuth()
    const { getById } = useGrantDate()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getById(id)
            setGrantDate(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
            <div className="m-auto" style={{ maxWidth: '630px' }}>

                <h3 className="text-center fw-normal">Data de Concessão</h3>

                {loading && (<p className="text-center mt-5">Carregando...</p>)}

                {grantDate && (<>
                    <div className="card d-flex m-auto mt-4">
                        <div className="card-header">
                            Dados da Data de Concessão
                        </div>
                        <div className="card-body">
                            <p><b className="me-2">Cliente:</b> {grantDate.client?.name || ''}</p>
                            {['MASTER', 'ADMIN'].includes(user.role) && (<>
                                <p><b className="me-2">Inserida por:</b> {grantDate.createdBy?.name || ''}</p>
                            </>)}
                            <p><b className="me-2">Data de Concessão:</b> {dateFormat(grantDate.date)}</p>
                            <p><b className="me-2">Data de Liberação:</b> {releaseDate(grantDate.date)}</p>
                        </div>
                    </div>
                </>)}

                <div className="mt-3 text-center">
                    <Link className="link-info" to="/grant-dates">Voltar</Link>
                </div>

            </div>
        </>
    )
}
