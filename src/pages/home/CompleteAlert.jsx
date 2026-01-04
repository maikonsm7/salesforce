import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import useAlert from "../../hooks/useAlert"
import { dateFormat } from "../../helpers/general"

export const CompleteAlert = () => {
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const { getById, completeAlert } = useAlert()
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
            <div className="m-auto" style={{maxWidth: 730}}>

                <h3 className="text-center fw-normal">Dados do Alerta</h3>

                {loading && (<p className="text-center mt-5">Carregando...</p>)}

                {alert && (<>
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
                </>)}

                <div className="mt-4 text-center">
                    <p>O alerta acima foi tratado?</p>
                    <button className="btn btn-info" onClick={() => completeAlert(id)}>Sim, concluir!</button>
                    <div className="mt-4">
                    <Link className="link-info" to="/home">Voltar</Link>
                    </div>
                </div>

            </div>
        </>
    )
}
