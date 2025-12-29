import { useState, useEffect } from "react"
import { Link, useParams } from "react-router"
import useGrantDate from "../../hooks/useGrantDate"
import useClient from "../../hooks/useClient"
import { dateForInput } from "../../helpers/general"

export const UpdateGrantDate = () => {
    const [clients, setClients] = useState([])
    const [clientId, setClientId] = useState('')
    const [date, setDate] = useState('')
    const { id } = useParams()
    const { getAll } = useClient()
    const { update, getById } = useGrantDate()

    useEffect(() => {
        const loadData = async () => {
            const [clientsData, grantDateData] = await Promise.all([
                getAll(),
                getById(id)
            ])
            setClients(clientsData)
            setClientId(grantDateData.clientId)
            setDate(dateForInput(grantDateData.date))
        }
        loadData()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        update({ clientId, date }, id)
    }

    return (
        <>
            <h3 className="text-center fw-normal">Atualizar Data de Concessão</h3>

            <main className="m-auto form-production">
                <form onSubmit={handleSubmit}>
                    <div className="border rounded-2 p-3">

                        <div className="mb-3 row">
                            <label htmlFor="clientId" className="col-sm-2 col-form-label">Cliente</label>
                            <div className="col-sm-10">
                                <select className="form-select" id="clientId" name="clientId" value={clientId} onChange={e => setClientId(e.target.value)}>
                                    <option value="">Selecione</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col">
                            <div className="row">
                                <label htmlFor="date" className="col col-form-label pe-0">Data de Concessão</label>
                                <div className="col-sm-6">
                                    <input type="date" className="form-control" name="date" value={date} onChange={e => setDate(e.target.value)} />
                                </div>
                            </div>
                        </div>

                    </div>

                    <button className="btn btn-info w-100 mt-3" type="submit">Atualizar</button>
                </form>
            </main>

            <div className="mt-3 text-center">
                <Link className="link-info" to="/grant-dates">Voltar</Link>
            </div>
        </>
    )
}
