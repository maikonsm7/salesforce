import { useState, useEffect } from "react"
import useProduction from "../../hooks/useProduction"
import useClient from "../../hooks/useClient"
import { Link } from "react-router"

export const CreateProduction = () => {
    const [clients, setClients] = useState([])
    const [clientId, setClientId] = useState("")
    const [conta, setConta] = useState("")
    const { getAll: getAllClients } = useClient()
    const { create } = useProduction()

    useEffect(() => {
        const loadData = async () => {
            const data = await getAllClients()
            setClients(data)
        }
        loadData()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        create({ conta, clientId })
    }

    return (
        <>
            <h3 className="text-center fw-normal">Inserir Produção</h3>

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

                    <button className="btn btn-info w-100 mt-2" type="submit">Inserir</button>
                </form>
            </main>
            <div className="mt-3 text-center">
                <Link className="link-info" to="/productions">Voltar</Link>
            </div>
        </>
    )
}
