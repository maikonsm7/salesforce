import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import useProduction from "../../hooks/useProduction"
import { dateHour } from "../../helpers/general"

export const DeleteProduction = () => {
    const [production, setProduction] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const { getById, remove } = useProduction()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await getById(id)
            setProduction(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
            <div className="m-auto" style={{ maxWidth: 730 }}>

                <h3 className="text-center fw-normal pb-3">Deletar Produção</h3>

                {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>

                    {production ? (
                        <>
                            <div className="card d-flex m-auto mt-2">
                                <div className="card-header">
                                    Dados da Produção
                                </div>
                                <div className="card-body">
                                    <p><b className="me-2">Cliente:</b> {production.client?.name || ''}</p>
                                    <p><b className="me-2">Data/Hora:</b> {dateHour(production.createdAt)}</p>
                                    <hr />

                                    <div className="row row-cols-1 row-cols-md-2 g-4">
                                        <div className="col">
                                            <p><b className="me-2">Emp. Consignado:</b> {production.consignado}</p>
                                            <p><b className="me-2">Abertura de conta:</b> {production.conta}</p>
                                            <p><b className="me-2">Lime:</b> {production.lime}</p>
                                            <p><b className="me-2">Microseguro:</b> {production.microsseguro}</p>
                                        </div>

                                        <div className="col">
                                            <p><b className="me-2">Créd. Parcelado:</b> {production.parcelado}</p>
                                            <p><b className="me-2">Cartão de Crédito:</b> {production.cartao}</p>
                                            <p><b className="me-2">Cheque Especial:</b> {production.chess}</p>
                                            <p><b className="me-2">Consórcio:</b> {production.consorcio}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="text-center mt-3">
                                <p>Deseja realmente remover a produção acima?</p>
                                <button className="btn btn-danger" onClick={() => remove(id)}>Remover Produção</button>
                            </div>
                        </>
                    ) : (<>
                        <p className="text-center mt-5">Cliente não encontrado</p>
                    </>)}
                </>)}
                <div className="mt-3 text-center">
                    <Link className="link-info" to="/productions">Voltar</Link>
                </div>
            </div>
        </>
    )
}
