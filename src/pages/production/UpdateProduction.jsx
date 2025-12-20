import { useState, useEffect } from "react"
import useProduction from "../../hooks/useProduction"
import useClient from "../../hooks/useClient"
import { Link, useParams } from "react-router"

export const UpdateProduction = () => {
    const [clients, setClients] = useState([])
    const [clientId, setClientId] = useState("")
    const [conta, setConta] = useState("")
    const { id } = useParams()
    const { getAll: getAllClients } = useClient()
    const { getById, update } = useProduction()

    useEffect(() => {
        const loadData = async () => {
            const clientsData = await getAllClients()
            const productionData = await getById(id)
            setClients(clientsData)
            setConta(productionData.conta)
            setClientId(productionData.clientId)
        }
        loadData()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        update({ conta, clientId }, id)
    }

    return (
        <>
            <h3 className="text-center fw-normal">Atualizar Produção</h3>

            <main className="m-auto form-container">
                <form onSubmit={handleSubmit}>

                    <div className="col">
                        <label htmlFor="clientId" className="form-label">Cliente</label>
                        <select className="form-select" id="clientId" name="clientId" value={clientId} onChange={e => setClientId(e.target.value)}>
                            <option value="">Selecione</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>{client.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-floating">
                        <input
                            type="number"
                            className="form-control"
                            id="conta"
                            placeholder="conta"
                            value={conta}
                            onChange={e => setConta(e.target.value)}
                        />
                        <label htmlFor="conta">Conta</label>
                    </div>

                    <button className="btn btn-info w-100 mt-2" type="submit">Atualizar</button>
                </form>
            </main>
            <div className="mt-3 text-center">
                <Link className="link-info" to="/productions">Voltar</Link>
            </div>
        </>
    )
}
