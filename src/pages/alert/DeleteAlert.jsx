import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import useAlert from "../../hooks/useAlert"
import { dateFormat } from "../../helpers/general"

export const DeleteAlert = () => {
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const { getById, remove } = useAlert()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getById(id)
            setAlert(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
            <div className="m-auto" style={{ maxWidth: '630px' }}>

                <h3 className="text-center fw-normal pb-3">Deletar Alerta</h3>

                {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>

                    {alert ? (
                        <>
                            <div className="card d-flex m-auto mt-4">
                                <div className="card-header">
                                    Dados do Alerta
                                </div>
                                <div className="card-body">
                                    <p><b className="me-2">Cliente:</b> {alert.client?.name || ''}</p>
                                    <p><b className="me-2">Data do alerta:</b> {dateFormat(alert.date)}</p>
                                    <p><b className="me-2">Descrição:</b> {alert.description}</p>
                                </div>
                            </div>

                            <div className="text-center mt-3">
                                <p>Deseja realmente remover o alerta acima?</p>
                                <button className="btn btn-danger" onClick={() => remove(id)}>Remover Alerta</button>
                            </div>
                        </>
                    ) : (<>
                        <p className="text-center mt-5">Alerta não encontrado</p>
                    </>)}
                </>)}
                <div className="mt-3 text-center">
                    <Link className="link-info" to="/alerts">Voltar</Link>
                </div>
            </div>
        </>
    )
}
