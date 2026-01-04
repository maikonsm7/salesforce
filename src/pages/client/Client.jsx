import { useEffect, useState } from "react"
import useClient from "../../hooks/useClient"
import { Link, useParams } from "react-router"
import { applyMask } from "../../helpers/general"

export const Client = () => {
    const [client, setClient] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const { getById } = useClient()

    useEffect(() => {
        const loadData = async () => {
            const data = await getById(id)
            setClient(data)
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <>
            <div className="m-auto" style={{maxWidth: 730}}>

                <h3 className="text-center fw-normal">Cliente</h3>

                {loading ? (<p className="text-center mt-5">Carregando...</p>) : (<>

                    {client ? (
                        <>
                            <div className="card">
                                <div className="card-header">
                                    Dados Cadastrais
                                </div>
                                <div className="card-body">
                                    <p><b className="me-2">Nome:</b> {client.name}</p>
                                    <p><b className="me-2">CPF:</b> {applyMask(client.cpf, "###.###.###-##")}</p>
                                    <p><b className="me-2">Telefone:</b> {applyMask(client.phone, "(##) #####-####")}</p>
                                </div>
                            </div>
                        </>
                    ) : (<>
                        <p className="text-center mt-5">Cliente não encontrado</p>
                    </>)}
                </>)}
                <div className="mt-3 text-center">
                    <Link className="link-info" to="/clients">Voltar</Link>
                </div>
            </div>
        </>
    )
}
