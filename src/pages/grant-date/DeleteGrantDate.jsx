import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import useGrantDate from "../../hooks/useGrantDate"
import { dateFormat } from "../../helpers/general"

export const DeleteGrantDate = () => {
    const [grantDate, setGrantDate] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const { getById, remove } = useGrantDate()

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

                <h3 className="text-center fw-normal pb-3">Deletar Data de Concessão</h3>

                {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>

                    {grantDate ? (
                        <>
                            <div className="card d-flex m-auto mt-4">
                                <div className="card-header">
                                    Dados da Data de Concessão
                                </div>
                                <div className="card-body">
                                    <p><b className="me-2">Cliente:</b> {grantDate.client?.name || ''}</p>
                                    <p><b className="me-2">Data de concessão:</b> {dateFormat(grantDate.date)}</p>
                                    <p><b className="me-2">Data de liberação:</b> {dateFormat(grantDate.releaseDate)}</p>
                                </div>
                            </div>

                            <div className="text-center mt-3">
                                <p>Deseja realmente remover a data de concessão acima?</p>
                                <button className="btn btn-danger" onClick={() => remove(id)}>Remover Data de Concessão</button>
                            </div>
                        </>
                    ) : (<>
                        <p className="text-center mt-5">Data de concessão não encontrado</p>
                    </>)}
                </>)}
                <div className="mt-3 text-center">
                    <Link className="link-info" to="/grant-dates">Voltar</Link>
                </div>
            </div>
        </>
    )
}
